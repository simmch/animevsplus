const mongoose = require("mongoose");

const AbyssSchema = new mongoose.Schema({
    FLOOR: {
        type: Number,
        required: true
    },
    ENEMIES: {
        type: Array,
        required: true
    },
    BANNED_CARDS: {
        type: Array,
        required: true
    },
    BANNED_TITLES: {
        type: Array,
        required: true
    },
    BANNED_ARMS: {
        type: Array,
        required: true
    },
    BANNED_UNIVERSES: {
        type: Array,
        required: true
    },
    BANNED_TIERS: {
        type: Array,
        required: true
    },
    BANNED_PETS: {
        type: Array,
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
    SPECIAL_BUFF: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    }
});

const collection = "ABYSS"

module.exports = Abyss = mongoose.model("abyss", AbyssSchema, collection);