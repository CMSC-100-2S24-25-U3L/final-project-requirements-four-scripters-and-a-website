import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Add this to your existing imports
import dotenv from 'dotenv';
dotenv.config();

// user imports
import {saveUser} from "./userController.js" // import controller functions

// shared validation function
// validate email format
  // ^[^\s@]+      -> start with one or more characters that are not whitespace (\s) or @
  // @            -> followed by a single @,
  // [^\s@]+      -> then again one or more characters that are not whitespace or @
  // \.           -> followed by a literal . (dot)
  // [^\s@]+$     -> And end with one or more characters that are not whitespace or @
export const validateEmailFormat = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// helper function to handle validation and normalization
// returns normalized email if valid, otherwise sends error response
export const processEmail = (email, res) => {
  if (!validateEmailFormat(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return null;
  }
  return email.toLowerCase();
};

// password hashing by bcrypt
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// sign up function
export const signUpUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, middleName } = req.body;

    // validate email format
    const processedEmail = processEmail(email, res);
    if (!processedEmail) return;

    // check if user already exists
    const existingUser = await User.findOne({ email: processedEmail });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // hash the password before saving
    const hashedPassword = await hashPassword(password);

    // create user object with hashed password
    const newUser = new User({
            email: processedEmail,
            password: hashedPassword,
            firstName,
            lastName,
            middleName: middleName || undefined, // only include if provided
            userType: 'customer' // default user type
        });

        await newUser.save();
        
        // generate token for the new user
        const token = await newUser.generateAuthToken();

        // return user data with token but without password 
        const { password: _, tokens, ...userData } = newUser.toObject();
        res.status(201).json({ user: userData, token });

    } catch (error) {
        res.status(500).json({ error: 'Server error during sign up' });
    }
};

// sign in function
export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'Email and password are required' 
      });
    }

    // Process email
    if (!validateEmailFormat(email)) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'Invalid email format' 
      });
    }

    const processedEmail = email.toLowerCase();

    // Find user
    const user = await User.findOne({ email: processedEmail });
    if (!user) {
      return res.status(401).json({ 
        error: 'Authentication Error',
        message: 'Invalid credentials' 
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Authentication Error',
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = await user.generateAuthToken();

    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    res.json({ 
      success: true,
      user: userData, 
      token 
    });

  } catch (error) {
    console.error('SignIn Error:', error);
    res.status(500).json({ 
      error: 'Server Error',
      message: 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// auth middleware for tokens
export const authenticateUser = async (req, res, next) => {
  try {
    // get the token from the "Authentication" header ("Bearer <token>") by removing the Bearer part
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) { // if no token is found, respond with unauthorized
      return res.status(401).json({ error: 'Authentication required' });
    }
    // check if the token is indeed using the secret key (to check if not expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // find the user in the database using the decoded _id and also check
    // if this token exists in the user's list of tokens
    const user = await User.findOne({ 
      _id: decoded._id, 
      'tokens.token': token 
    });

    // if no user found or token doesn't match, reject authentication
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // if no errors, attach the token and user info to the request object for route handlers to access it
    req.token = token;
    req.user = user;

    // call next() to pass control to the next middleware
    next();
  } catch (error) {
    // if any error occurs (invalid token, expired token, etc.), respond with 401
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export const authorizeMerchant = (req, res, next) => {
  // Assuming authenticateUser sets req.user
  if (req.user && req.user.userType === 'merchant') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: merchant only.' });
  }
};