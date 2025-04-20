import needle from "needle";  // allows for needle operations

// base url where the serer is running
const BASE_URL = "http://localhost:3000";

// test data for a User
const testUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "secure123",
  userType: "customer"
};

// test data for a Product
const testProduct = {
  productID: "PROD-001",
  productName: "Organic Apples",
  productDescription: "Fresh organic apples from local farm",
  productType: 1,
  productQuantity: 100
};

// function to insert the data into the database
const runTests = async () => {
  try { // perform a post operation on the users collection to insert the json parsed testUser(a javascript object)
    const userRes = await needle("post", `${BASE_URL}/users`, testUser, { json: true });
    console.log("User created:", userRes.body); // if successful, print the created user
  } catch (err) {
    console.error("Error creating user:", err);
  }

  try { // perform a post operation on the products collection to insert the json parsed testProduct(a javascript object)
    const productRes = await needle("post", `${BASE_URL}/products`, testProduct, { json: true });
    console.log("Product created:", productRes.body); // if successful, print the created product
  } catch (err) {
    console.error("Error creating product:", err);
  }
};

runTests();