let express = require('express');
const Customer = require('../model/CustomerSchema');
let router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allcustomers = await Customer.find();

        res.json({ status: "success", data: allcustomers });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customerId = req.params.id;

        let singleRecord = await Customer.findById(customerId);
        res.json({ status: "success", data: singleRecord })
    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

router.post("/signup", async (req, res) => {

    try {
        // console.log(req.body);

        const { firstName, lastName, email, mobile, address, password } = req.body;

        const createCustomer = await Customer.create({ firstName, lastName, email, mobile, address, password });

        res.json({ status: "success", data: createCustomer });
    } catch (err) {
        res.json({ status: "error", data: err });
    }

});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(req.body);

        const user = await Customer.findOne({ email });
        if (!user) return res.json({ status: "error", data: "User not found" });

        if (user.password !== password) return res.json({ status: "error", data: "Invalid credentials" });

        // Manually setting cookie without cookie-parser
        // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly; SameSite=Strict");

        res.json({ status: "success", data: user });
    } catch (error) {
        res.json({ data: "Server error", error });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const customer_Id = req.params.id;
        const body = req.body;

        let updatedRecord = await Customer.findByIdAndUpdate(customer_Id, body, { new: true });

        res.json({ status: "success", data: updatedRecord })
    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

router.delete("/:id", async (req, res) => {

    try {
        console.log(req.params.id);

        let deletedRecord = await Customer.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedRecord });

    } catch (err) {
        res.json({ status: "error", data: err })
    }
});

module.exports = router;
