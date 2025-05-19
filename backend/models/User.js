import mongoose from "../mongoose.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  userType: { 
    type: String, 
    required: true,
    enum: ['customer', 'merchant'],
    default : 'customer'
  },
  email : { type: String, required: true, unique: true },
  password : { type: String, required: true },
  tokens: [{
    token: { type: String, required: true }
  }]
});

// this method will generate a JWT token for the user when they log in or sign up
userSchema.methods.generateAuthToken = async function() {
  try {
    console.log('Generating token for user:', this._id);
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    
    const token = jwt.sign(
      { _id: this._id.toString() }, // Ensure _id is string
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.error('Token generation failed:', error);
    throw error;
  }
};

// remove password and tokens from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();   // convert to plain JS object
  delete user.password;           // remove password before sending
  delete user.tokens;             // remove token list for security
  return user;
};

const User = mongoose.model("User", userSchema);
export default User;