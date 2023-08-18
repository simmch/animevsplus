const mongoose = require("mongoose");

const TitleSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: false
    },
    ABILITIES: {
        type: Array,
        required: false
    },
    UNIVERSE: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    RARITY: {
        type: String,
        required: false
    },
    UNLOCK_METHOD: {
        type: Object,
        required: false
    },
    ID: {
        type: String,
        required: false
    }
});

const collection = "TITLES"

module.exports = Title = mongoose.model("titles", TitleSchema, collection);