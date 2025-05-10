import mongoose from "../mongoose.js";

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
  password : { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
export default User;