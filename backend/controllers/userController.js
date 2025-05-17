import User from "../models/User.js";

// auth imports
import {processEmail, hashPassword} from "./authController.js" // import controller functions


export const saveUser = async (req, res) => {
  try {
    const { email } = req.body;

    const processedEmail = processEmail(email, res);
    if (!processedEmail) return; // failed validation

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user with hashed password
    const user = new User({ 
        ...req.body, 
        email: processedEmail,
        password: hashedPassword 
    });
    
    await user.save();
    
    // exclude password from response
    const { password, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // validate and process email from URL params
    const email = processEmail(req.params.email, res);
    if (!email) return;

    // prepare updates (this should be in the forms)
    const { firstName, middleName, lastName } = req.body;
    const updates = { firstName, lastName };
    
    // check if there is a middleName
    if (middleName !== undefined) {
      updates.middleName = middleName;  // add middleName to updates
    }

    // update user
    const updatedUser = await User.findOneAndUpdate(
      { email },  // search by the email
      { $set: updates },  // update fields in updates
      { 
        new: true,  // return the updated document instead of the orginal one
        runValidators: true // ensure to validate using the schema in the models
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // return safe user data (exclude the password)
    const { password, ...safeUser } = updatedUser.toObject();
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error during update' });
  }
};

export const removeUser = async (req, res) => {
  try {
    // validate and process email from URL params
    const email = processEmail(req.params.email, res);
    if (!email) return;

    // delete user from database
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // return success message
    res.json({ 
      message: 'User deleted successfully',
      email: deletedUser.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during deletion' });
  }
};


export const getUser = async (req, res) => {
  try { // check if there is a user by email
    const user = await User.findOne({ email: req.params.email })
    // respond with the error(404) message if we fail to find a match
    if (!user) return res.status(404).json({ error: 'User not found '});
    res.json(user); // else respond with the user    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

export const getCurrentUser = async (req, res) => {
  try {
    // the authenticateUser middleware already attached the user to req.user
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}