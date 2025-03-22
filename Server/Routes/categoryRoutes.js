let express = require('express');
const Category = require('../model/categorySchema');
let router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allCategory = await Category.find();

        res.json({ status: "success", data: allCategory });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        let singleRecord = await Category.findById(categoryId);
        res.json({ status: "success", data: singleRecord })
    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

router.post("/", async (req, res) => {

    try {

        const { name } = req.body;

        const createCategory = await Category.create({ name });

        res.json({ status: "success", data: createCategory });
    } catch (err) {
        res.json({ status: "error", data: err });
    }

});

router.put("/:id", async (req, res) => {

    try {

        const category_Id = req.params.id;
        const body = req.body;

        let updatedRecord = await Category.findByIdAndUpdate(category_Id, body, { new: true });

        res.json({ status: "success", data: updatedRecord })
    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

router.delete("/:id", async (req, res) => {

    try {
        console.log(req.params.id);

        let deletedRecord = await Category.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedRecord });

    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

module.exports = router;
