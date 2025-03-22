let mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String }
});


// Create Model
const Category = mongoose.model("categorie", categorySchema);

module.exports = Category;