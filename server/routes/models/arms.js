const mongoose = require("mongoose");

const ArmSchema = new mongoose.Schema({
    ARM: {
        type: String,
        required: false
    },
    PRICE: {
        type: Number,
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
    COLLECTION: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    STOCK: {
        type: Number,
        required: false
    },
    TOURNAMENT_REQUIREMENTS: {
        type: Number,
        required: false
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    EXCLUSIVE: {
        type: Boolean,
        required: false
    },
    ELEMENT: {
        type: String,
        required: false
    }
});

const collection = "ARM"

module.exports = Arm = mongoose.model("arm", ArmSchema, collection);