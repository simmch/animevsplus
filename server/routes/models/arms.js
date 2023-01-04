const mongoose = require("mongoose");

const ArmSchema = new mongoose.Schema({
    ARM: {
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
    COLLECTION: {
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
    },
    ELEMENT: {
        type: String,
        required: true
    }
});

const collection = "ARM"

module.exports = Arm = mongoose.model("arm", ArmSchema, collection);