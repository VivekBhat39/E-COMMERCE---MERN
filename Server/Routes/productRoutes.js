let express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

const Product = require('../model/ProductSchema');
const Category = require('../model/categorySchema');
let router = express.Router();


const storage = multer.diskStorage({
    destination: "./uploads/", // Folder where files will be saved
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Multer Upload Middleware
const upload = multer(
    // { dest: 'uploads/' }
    {
        storage: storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/;
            const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimeType = fileTypes.test(file.mimetype);

            if (extName && mimeType) {
                return cb(null, true);
            } else {
                return cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"));
            }
        }
    }
);

router.post("/", upload.single("image"), async (req, res) => {
    try {
        // Check if the image is uploaded

        if (!req.file) {
            return res.json({ status: "error", message: "No file uploaded!" });
        }

        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // console.log("File URL:", fileUrl);
        // console.log("Request Body:", req.body);

        const { name, category, price, mrp, brand, color, size, pquantity, description } = req.body;

        // Ensure all fields are present
        // if (!name || !categoryId || !price || !mrp || !brand || !color || !size || !description) {
        //     return res.json({ status: "error", message: "All fields are required!" });
        // }

        // // Ensure categoryId is a valid ObjectId
        // if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        //     return res.json({ status: "error", message: "Invalid category ID" });
        // }

        // Convert categoryId from string to ObjectId
        // const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

        // if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        //     return res.json({ status: "error", message: "Invalid categoryId!" });
        // }

        // Create product in MongoDB
        const createProduct = await Product.create({
            name,
            category,
            price,
            mrp,
            image: fileUrl, // Storing Image URL
            brand,
            color,
            size,
            pquantity,
            description
        });

        res.json({ status: "success", data: createProduct });

    } catch (err) {
        console.error("Error while creating product:", err);
        res.json({ status: "error", message: "Internal Server Error", error: err.message });
    }
});



router.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find({})
        // .populate("categoryId")
        // console.log(allProducts); // Log populated products to check the response
        res.json({ status: "success", data: allProducts });
    } catch (err) {
        console.error(err); // Log errors if any
        res.json({ status: "error", data: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        let singleProduct = await Product.findById(productId)

        res.json({ status: "success", data: singleProduct })
    } catch (err) {
        res.json({ status: "error", data: err })
    }
});


// router.put("/:id", async (req, res) => {

//     try {

//         const productId = req.params.id;
//         const body = req.body;
//         console.log(productId);
//         console.log(body);

//         console.log("Product ID:", productId);
//         console.log("Received Data:", body);
//         console.log("Received File:", req.file);


//         let updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });

//         res.json({ status: "success", data: updatedProduct })
//     } catch (err) {
//         res.json({ status: "error", data: err })
//     }
// });

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const productId = req.params.id;
        const body = req.body;
        console.log("Product ID:", productId);
        console.log("Received Data:", body);
        console.log("Received File:", req.file);

        // If a file was uploaded, update the image path
        if (req.file) {
            body.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, body, { new: true });

        if (!updatedProduct) {
            return res.json({ status: "error", message: "Product not found" });
        }

        res.json({ status: "success", data: updatedProduct });
    } catch (err) {
        console.error("Update Error:", err);
        res.json({ status: "error", message: err.message });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        let deletedProduct = await Product.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedProduct });

    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

// PUT /products/update-stock/:id
router.put('/update-stock/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const quantityPurchased = req.body.quantityPurchased;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Reduce quantity
        product.pquantity = Math.max(product.pquantity - quantityPurchased, 0);
        await product.save();

        res.json({ message: 'Stock updated', product });
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
