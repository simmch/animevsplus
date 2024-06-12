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
    ABILITIES: {
        type: Array,
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
    DROP_STYLE: {
        type: String,
        required: true
    },
    
});

const collection = "PET"

module.exports = Pet = mongoose.model("pet", PetSchema, collection);