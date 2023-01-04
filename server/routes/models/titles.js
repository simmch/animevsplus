const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    PRICE: {
        type: Number,
        required: true
    },
    ABILITIES: {
        type: Array,
        required: true
    },
    UNIVERSE: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    STOCK: {
        type: Number,
        required: true
    },
    TOURNAMENT_REQUIREMENTS: {
        type: Number,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    }
});

const collection = "TITLES"

module.exports = Title = mongoose.model("titles", TitleSchema, collection);