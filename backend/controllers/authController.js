import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

    // Validate email format
    const processedEmail = processEmail(email, res);
    if (!processedEmail) return;

    // Check if user already exists
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
            middleName: middleName || undefined, // Only include if provided
            userType: 'customer' // Default user type
        });

        await newUser.save();

        // Return user data without password
        const { password: _, ...userData } = newUser.toObject();
        res.status(201).json(userData);

    } catch (error) {
        res.status(500).json({ error: 'Server error during sign up' });
    }
};

// sign-in function
export const signInUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const proccesedEmail = processEmail(email, res);
    if (!proccesedEmail) return;

    // find user by email
    const user = await User.findOne({ email: proccesedEmail });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credetials' });
    }
    
    // exclude password from response
    const { password: _, ...safeUser } = user.toObject();
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error during sign in' });
  }
}