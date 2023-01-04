const mongoose = require("mongoose");

const BossSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    TITLE: {
        type: String,
        required: true
    },
    ARM: {
        type: String,
        required: true
    },
    PET: {
        type: String,
        required: true
    },
    CARD: {
        type: String,
        required: true
    },
    DESCRIPTION: {
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
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    }
});

const collection = "BOSS"

module.exports = Boss = mongoose.model("boss", BossSchema, collection);