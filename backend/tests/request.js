// Helper for API testing

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
const testProduct = [
  {
    productName: "Organic Apples",
    productDescription: "Fresh organic apples from a local farm.",
    productPrice: 120,
    productType: 1,
    productQuantity: 100,
    productImage: "https://tse4.mm.bing.net/th?id=OIP.D6jQZtMItEdKjjD3HHtS7wHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Brown Rice",
    productDescription: "Healthy and unpolished brown rice.",
    productPrice: 90,
    productType: 2,
    productQuantity: 50,
    productImage: "https://www.mashed.com/img/gallery/the-reason-some-brown-rice-grains-are-green/intro-1640096605.jpg"
  },
  {
    productName: "Carrots",
    productDescription: "Crunchy orange carrots, perfect for snacks or cooking.",
    productPrice: 45,
    productType: 1,
    productQuantity: 200,
    productImage: "https://tse3.mm.bing.net/th?id=OIP.v0Dj9TNkKdlybMW9cXuwgAHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Free-range Eggs",
    productDescription: "Dozen eggs from free-range hens.",
    productPrice: 75,
    productType: 4,
    productQuantity: 80,
    productImage: "https://tse4.mm.bing.net/th?id=OIP.Ufh58NbotU1ZEDRD1N3h0gHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Bananas",
    productDescription: "Sweet and ripe bananas sourced from Mindanao.",
    productPrice: 60,
    productType: 1,
    productQuantity: 150,
    productImage: "https://tse2.mm.bing.net/th?id=OIP.iFm2DffdX5eMg2LjmcRovQHaEK&pid=Api&P=0&h=180"
  },
  {
    productName: "Fresh Milk",
    productDescription: "Locally sourced fresh cow’s milk, 1 liter.",
    productPrice: 110,
    productType: 5,
    productQuantity: 70,
    productImage: "http://cdn.shopify.com/s/files/1/0063/7966/7541/products/image_1200x1200.png?v=1607897325"
  },
  {
    productName: "Tomatoes",
    productDescription: "Juicy red tomatoes, perfect for salads or sauces.",
    productPrice: 40,
    productType: 1,
    productQuantity: 120,
    productImage: "https://sproutedgarden.com/wp-content/uploads/2023/03/cherry-tomatoes-6403-top2-1024x806.jpg"
  },
  {
    productName: "Tilapia",
    productDescription: "Freshwater tilapia, sold per kilo.",
    productPrice: 130,
    productType: 3,
    productQuantity: 60,
    productImage: "https://static.vecteezy.com/system/resources/previews/014/232/646/non_2x/fresh-raw-tilapia-fish-from-the-tilapia-farm-tilapia-with-ice-on-dark-background-top-view-free-photo.JPG"
  },
  {
    productName: "Chicken Breast",
    productDescription: "Boneless chicken breast, packed in 500g portions.",
    productPrice: 150,
    productType: 3,
    productQuantity: 90,
    productImage: "https://www.khhet.com/wp-content/uploads/2020/11/Raw-chicken-breast-scaled.jpg"
  },
  {
    productName: "Potato",
    productDescription: "Locally harvested potatoes, sold per kilo.",
    productPrice: 50,
    productType: 1,
    productQuantity: 180,
    productImage: "http://fillyourplate.org/blog/wp-content/uploads/2015/09/bigstock-Farm-Fresh-Potatoes-On-A-Hess-65649211.jpg"
  }
];

// function to insert the data into the database
const runTests = async () => {
  try { // perform a post operation on the users collection to insert the json parsed testUser(a javascript object)
    const userRes = await needle("post", `${BASE_URL}/users`, testUser, { json: true });
    console.log("User created:", userRes.body); // if successful, print the created user
  } catch (err) {
    console.error("Error creating user:", err);
  }

  // Loop through the testProducts array and insert each product
  for (const product of testProduct) {
    try {
      const productRes = await needle("post", `${BASE_URL}/products`, product, { json: true });
      console.log("Product created:", productRes.body);  // if successful, print the created product
    } catch (err) {
      console.error("Error creating product:", err);
    }
  }
};

runTests();