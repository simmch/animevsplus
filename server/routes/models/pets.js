const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    PET: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    UNIVERSE: {
        type: String,
        required: true
    },
    LVL: {
        type: Number,
        required: true
    },
    ABILITIES: {
        type: Array,
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
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    }
});

const collection = "PET"

module.exports = Pet = mongoose.model("pet", PetSchema, collection);