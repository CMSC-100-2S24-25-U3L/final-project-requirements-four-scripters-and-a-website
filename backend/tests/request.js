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
    productType: 2,
    productQuantity: 100,
    productImage: "https://tse4.mm.bing.net/th?id=OIP.D6jQZtMItEdKjjD3HHtS7wHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Fresh Strawberries",
    productDescription: "Juicy, fresh strawberries perfect for desserts and snacks.",
    productPrice: 180,
    productType: 2,
    productQuantity: 100,
    productImage: "https://cdn.shopify.com/s/files/1/0206/9470/files/Strawberries-squared-1024.jpg?16703893207096014252"
  },
  {
    productName: "Sweet Mangoes",
    productDescription: "Tropical sweet mangoes, freshly picked and delicious.",
    productPrice: 150,
    productType: 2,
    productQuantity: 100,
    productImage: "https://sukhis.com/app/uploads/2022/09/image4-1024x683.jpg"
  },
  {
    productName: "Seedless Grapes",
    productDescription: "Crisp and sweet seedless grapes, great for snacking.",
    productPrice: 200,
    productType: 2,
    productQuantity: 100,
    productImage: "https://png.pngtree.com/background/20211215/original/pngtree-photograph-of-grapes-in-a-plate-with-summer-fruit-ingredients-picture-image_1476828.jpg"
  },
  {
    productName: "Fresh Oranges",
    productDescription: "Vitamin C-rich oranges, freshly harvested.",
    productPrice: 110,
    productType: 2,
    productQuantity: 100,
    productImage: "https://www.boldsky.com/img/2015/12/29-orange-22-1450786177.jpg"
  },
  {
    productName: "Brown Rice",
    productDescription: "Healthy and unpolished brown rice.",
    productPrice: 90,
    productType: 1,
    productQuantity: 100,
    productImage: "https://www.mashed.com/img/gallery/the-reason-some-brown-rice-grains-are-green/intro-1640096605.jpg"
  },
  {
    productName: "Quinoa",
    productDescription: "Nutritious and protein-rich whole grain quinoa.",
    productPrice: 150,
    productType: 1,
    productQuantity: 100,
    productImage: "https://blog.fablunch.com/wp-content/uploads/QuinoaWEB2.jpg.jpg"
  },
  {
    productName: "Barley",
    productDescription: "Whole grain barley perfect for soups and salads.",
    productPrice: 80,
    productType: 1,
    productQuantity: 100,
    productImage: "https://www.tastingtable.com/img/gallery/why-you-should-always-keep-barley-in-your-pantry/l-intro-1658828038.jpg"
  },
  {
    productName: "Oats",
    productDescription: "Rolled oats ideal for breakfast and baking.",
    productPrice: 120,
    productType: 1,
    productQuantity: 100,
    productImage: "https://healthyhabits.care/wp-content/uploads/2018/04/intro-oats.jpg"
  },
  {
    productName: "Millet",
    productDescription: "Small-seeded grain with a mild flavor and high nutrition.",
    productPrice: 100,
    productType: 1,
    productQuantity: 100,
    productImage: "https://zenithbuzz.in/wp-content/uploads/2018/03/Foxtail-Millet-.jpg"
  },
  {
    productName: "Corn",
    productDescription: "Whole grain corn, great for various recipes.",
    productPrice: 70,
    productType: 1,
    productQuantity: 100,
    productImage: "https://nebraskacorn.gov/wp-content/uploads/2014/06/Sweet-Corn.jpg"
  },
  {
    productName: "Carrots",
    productDescription: "Crunchy orange carrots, perfect for snacks or cooking.",
    productPrice: 45,
    productType: 3,
    productQuantity: 100,
    productImage: "https://tse3.mm.bing.net/th?id=OIP.v0Dj9TNkKdlybMW9cXuwgAHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Broccoli",
    productDescription: "Fresh green broccoli, rich in vitamins and minerals.",
    productPrice: 60,
    productType: 3,
    productQuantity: 100,
    productImage: "https://www.simplyrecipes.com/thmb/5uAHGBpeMGNyIasMkUj0zUfbHvk=/2000x1333/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2006__01__steamed-broccoli-horiz-b-2000-9c966360d0ad47a29120d700906697d9.jpg"
  },
  {
    productName: "Spinach",
    productDescription: "Tender and nutritious spinach leaves, great for salads.",
    productPrice: 50,
    productType: 3,
    productQuantity: 100,
    productImage: "https://images.squarespace-cdn.com/content/v1/5e4d646fb8470a53cbeab41d/1621522401013-WYFG4Y29JHC87BI207IW/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/spinach"
  },
  {
    productName: "Bell Peppers",
    productDescription: "Colorful bell peppers, crunchy and sweet.",
    productPrice: 70,
    productType: 3,
    productQuantity: 100,
    productImage: "https://tse4.mm.bing.net/th?id=OIP.kDPiG_K3k6Zq3lPaHH5iQwHaD4&pid=Api&P=0&h=180"
  },
  {
    productName: "Cucumbers",
    productDescription: "Fresh cucumbers, crisp and hydrating.",
    productPrice: 40,
    productType: 3,
    productQuantity: 100,
    productImage: "https://miro.medium.com/v2/resize:fit:1200/0*wi5UkeyUiQ5-_YE7"
  },
  {
    productName: "Free-range Eggs",
    productDescription: "Dozen eggs from free-range hens.",
    productPrice: 75,
    productType: 4,
    productQuantity: 100,
    productImage: "https://tse4.mm.bing.net/th?id=OIP.Ufh58NbotU1ZEDRD1N3h0gHaE8&pid=Api&P=0&h=180"
  },
  {
    productName: "Fresh Milk",
    productDescription: "Locally sourced fresh cow’s milk, 1 liter.",
    productPrice: 110,
    productType: 4,
    productQuantity: 100,
    productImage: "http://cdn.shopify.com/s/files/1/0063/7966/7541/products/image_1200x1200.png?v=1607897325"
  },
  {
    productName: "Cheddar Cheese",
    productDescription: "Aged cheddar cheese with a sharp and tangy flavor.",
    productPrice: 250,
    productType: 4,
    productQuantity: 100,
    productImage: "https://www.nutritionadvance.com/wp-content/uploads/2018/05/Cheddar-Cheese-101.jpg"
  },
  {
    productName: "Yogurt",
    productDescription: "Creamy plain yogurt, rich in probiotics.",
    productPrice: 90,
    productType: 4,
    productQuantity: 100,
    productImage: "https://www.verywellfit.com/thmb/ta0-zH0JapmUjj985FYhI-CMdW0=/1994x1397/filters:fill(FFDB5D,1)/yogurtberries14-56a5c2823df78cf77289c882.jpg"
  },
  {
    productName: "Butter",
    productDescription: "Fresh unsalted butter, perfect for cooking and baking.",
    productPrice: 130,
    productType: 4,
    productQuantity: 100,
    productImage: "http://upload.wikimedia.org/wikipedia/commons/f/fd/Western-pack-butter.jpg"
  },
  {
    productName: "Mozzarella Cheese",
    productDescription: "Soft mozzarella cheese, great for pizzas and salads.",
    productPrice: 200,
    productType: 4,
    productQuantity: 100,
    productImage: "https://thecheeseatlas.com/wp-content/uploads/2021/12/mozzarella-di-bufala-500gr_1_1200x1200-01.jpeg"
  },
  {
    productName: "Cream Cheese",
    productDescription: "Smooth and creamy cheese spread.",
    productPrice: 140,
    productType: 4,
    productQuantity: 100,
    productImage: "https://www.servedfromscratch.com/wp-content/uploads/2014/11/creamcheese2-1024x683.jpg"
  },
  {
    productName: "Bananas",
    productDescription: "Sweet and ripe bananas sourced from Mindanao.",
    productPrice: 60,
    productType: 2,
    productQuantity: 100,
    productImage: "https://tse2.mm.bing.net/th?id=OIP.iFm2DffdX5eMg2LjmcRovQHaEK&pid=Api&P=0&h=180"
  },
  {
    productName: "Tomatoes",
    productDescription: "Juicy red tomatoes, perfect for salads or sauces.",
    productPrice: 40,
    productType: 3,
    productQuantity: 100,
    productImage: "https://sproutedgarden.com/wp-content/uploads/2023/03/cherry-tomatoes-6403-top2-1024x806.jpg"
  },
  {
    productName: "Tilapia",
    productDescription: "Freshwater tilapia, sold per kilo.",
    productPrice: 130,
    productType: 5,
    productQuantity: 100,
    productImage: "https://static.vecteezy.com/system/resources/previews/014/232/646/non_2x/fresh-raw-tilapia-fish-from-the-tilapia-farm-tilapia-with-ice-on-dark-background-top-view-free-photo.JPG"
  },
  {
    productName: "Chicken Breast",
    productDescription: "Boneless chicken breast, packed in 500g portions.",
    productPrice: 150,
    productType: 5,
    productQuantity: 100,
    productImage: "https://www.khhet.com/wp-content/uploads/2020/11/Raw-chicken-breast-scaled.jpg"
  },
  {
    productName: "Pork Belly",
    productDescription: "Fresh pork belly, perfect for grilling or roasting.",
    productPrice: 180,
    productType: 5,
    productQuantity: 100,
    productImage: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/raw-pork-belly-with-rind-teubner-foodfoto.jpg"
  },
  {
    productName: "Ground Beef",
    productDescription: "Lean ground beef, ideal for burgers and meatballs.",
    productPrice: 220,
    productType: 5,
    productQuantity: 100,
    productImage: "http://excelfreshmeats.com/wp-content/uploads/2016/10/Ground-Beef-80-Lean-high-res.jpg"
  },
  {
    productName: "Lamb Chops",
    productDescription: "Tender lamb chops, fresh and ready to cook.",
    productPrice: 350,
    productType: 5,
    productQuantity: 100,
    productImage: "https://t4.ftcdn.net/jpg/06/18/23/59/360_F_618235983_RX6pEadtVTOEsR4KqArB1QRuKl6Z3Vdk.jpg"
  },
  {
    productName: "Beef Steak",
    productDescription: "Premium cut beef steak, juicy and flavorful.",
    productPrice: 400,
    productType: 5,
    productQuantity: 100,
    productImage: "https://www.etem-augsburg.de/wp-content/uploads/2016/11/butcherraw2.jpg"
  },
  {
    productName: "Pork Ribs",
    productDescription: "Succulent pork ribs, perfect for barbecues.",
    productPrice: 280,
    productType: 5,
    productQuantity: 100,
    productImage: "https://image.freepik.com/free-photo/fresh-raw-pork-spare-ribs-marble_89816-12645.jpg"
  },
  {
    productName: "Potato",
    productDescription: "Locally harvested potatoes, sold per kilo.",
    productPrice: 50,
    productType: 3,
    productQuantity: 100,
    productImage: "https://cdn.mos.cms.futurecdn.net/tzSsMvbYQeb6XjEaRSBPMi.jpg"
  }
];


const testOrders = [
  {
    products: [
      { productID: "681f6bfe7659629310cac5a1", quantity: 2 }, // Fresh Milk
      { productID: "681f6bfe7659629310cac5a3", quantity: 5 }  // Tomatoes
    ],
    orderStatus: 0,
    email: "user@gmail.com",
    dateOrdered: new Date("2025-05-15T10:00:00Z")
  },
  {
    products: [
      { productID: "681f6bff7659629310cac5a7", quantity: 1 }, // Chicken Breast
      { productID: "681f6bff7659629310cac5a9", quantity: 3 }  // Potato
    ],
    orderStatus: 1,
    email: "user@gmail.com",
    dateOrdered: new Date("2025-05-16T12:30:00Z")
  },
  {
    products: [
      { productID: "681f6bfe7659629310cac5a5", quantity: 4 }  // Tilapia
    ],
    orderStatus: 2,
    email: "user@gmail.com",
    dateOrdered: new Date("2025-05-14T09:15:00Z")
  }
];

// function to insert the data into the database
const runTests = async () => {
  // try { // perform a post operation on the users collection to insert the json parsed testUser(a javascript object)
  //   const userRes = await needle("post", `${BASE_URL}/users`, testUser, { json: true });
  //   console.log("User created:", userRes.body); // if successful, print the created user
  // } catch (err) {
  //   console.error("Error creating user:", err);
  // }

  // // Loop through the testProducts array and insert each product
  for (const product of testProduct) {
    try {
      const productRes = await needle("post", `${BASE_URL}/products`, product, { json: true });
      console.log("Product created:", productRes.body);  // if successful, print the created product
    } catch (err) {
      console.error("Error creating product:", err);
    }
  }

  // for (const order of testOrders) {
  //   try {
  //     const orderRes = await needle("post", `${BASE_URL}/orders`, order, { json: true });
  //     console.log("Order created:", orderRes.body);
  //   } catch (err) {
  //     console.error("Error creating order:", err);
  //   }
  // }
};

runTests();