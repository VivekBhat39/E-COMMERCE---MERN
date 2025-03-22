let mongoose = require('mongoose');


const orderDetailsSchema = new mongoose.Schema({
    orderId: { type: mongoose.Types.ObjectId, ref: "order" },
    productId: { type: String },
    quantity: { type: String },
    price: { type: String },
});


// Create Model
const Order = mongoose.model("order", orderDetailsSchema);

module.exports = Order;




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