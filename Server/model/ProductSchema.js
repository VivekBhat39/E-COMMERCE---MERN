let mongoose = require('mongoose');
// const Category = require("./categorySchema"); // Adjust the path accordingly

const productSchema = new mongoose.Schema({
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    mrp: { type: Number },
    image: { type: String },
    brand: { type: String },
    color: { type: String },
    size: { type: Number },
    pquantity: { type: Number },
    description: { type: String }
});


// Create Model
const Product = mongoose.model("product", productSchema);

module.exports = Product;




// {
//     "name": "Kids Shoes",
//     "categoryId" : "67b44562fa6d800a4d0bb663",
//       "price": "150",
//       "mrp": "250",
//       "imageUrl": "IMAGE",
//       "brand": "PUMA",
//       "color": "White",
//       "size": 45,
//       "description": "Trendy Kids Shoes"
//   }