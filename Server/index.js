let express = require('express');
let bodyParser = require('body-parser')
let cors = require('cors');
let mongoose = require('mongoose');
let axios = require('axios');

mongoose.connect("mongodb://localhost:27017/e-commerce")
   .then((res) => {
      console.log("DataBase Connected......");
   });

let app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));
app.use(cors());

app.get("/", (req, res) => {
   res.send("Welcome to node Nodejs")
});

app.use('/uploads', express.static('uploads'));
// app.use("/products", express.static("uploads")); // Serve uploaded files


app.use("/customers", require('./Routes/customerRoutes'));
app.use("/products", require('./Routes/productRoutes'));
app.use("/categories", require("./Routes/categoryRoutes"));
app.use("/orders", require('./Routes/orderRoutes'));
// app.use("/orderItems ", require('./Routes/orderRoutes'));


// Fetch Razorpay Settlements
app.get("/api/settlements", async (req, res) => {
   try {
      const response = await axios.get("https://api.razorpay.com/v1/settlements", {
         auth: {
            username: "rzp_test_4yosHYDduPYmKN", // Secure API Key ID
            password: "vky39", // Secure API Key Secret
         },
      });

      res.json(response.data); // Send data to frontend
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

const PORT = 8080;
app.listen(PORT, () => {
   console.log(`Server Running on http://localhost:${PORT}`);
})