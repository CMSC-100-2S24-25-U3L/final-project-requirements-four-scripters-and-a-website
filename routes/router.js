import express from "express";
// import all controller functions from the controller file
import {
  saveUser,
  getUser,
  getAllUsers,
  updateUser,
  removeUser,
  saveProduct,
  getProduct,
  updateProduct,
  removeProduct,
  saveOrderTransaction,
  getOrderTransaction,
} from "../controllers/controller.js" // import controller functions

// create a new router instance to handle routes
const router = express.Router();  // creates a new instance of router to define the api routes

// define the root route
router.get('/', (req, res) => {
  // send welcome message for the root path
  res.send('Welcome to the API!');  // welcome screen for the '/' path
});

// user routes
router.post('/users', saveUser); // create new user
router.get('/users', getAllUsers); // get all users
router.get('/users/:email', getUser); // get user by email
router.put('/users/:email', updateUser); // update user by email
router.delete('/users/:email', removeUser); // delete user by email

// product routes
router.post('/products', saveProduct); // create new product
router.get('/products/:productID', getProduct); // get product by id
router.put('/products/:productID', updateProduct); // update product by id
router.delete('/products/:productID', removeProduct); // delete product by id

// order routes
router.post('/orders', saveOrderTransaction); // create new order
router.get('/orders/:transactionID', getOrderTransaction); // get order by transaction id

// export the router to be used in the main server file
export default router;