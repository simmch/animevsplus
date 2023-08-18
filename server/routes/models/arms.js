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
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    ELEMENT: {
        type: String,
        required: false
    }, 
    DROP_STYLE: {
        type: String,
        required: false
    },
    ID: {
        type: String,
        required: false
    },
});

const collection = "ARM"

module.exports = Arm = mongoose.model("arm", ArmSchema, collection);