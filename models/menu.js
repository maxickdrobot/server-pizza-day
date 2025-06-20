const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    soldOut: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Pizza", pizzaSchema, "menu");
