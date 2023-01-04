const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    GAME: {
        type: String,
        required: true
    },
    IMAGE_URL: {
        type: String,
        required: true
    },
    TYPE: {
        type: Array,
        required: true
    },
    IGN: {
        type: Boolean,
        required: true
    },
    ALIASES: {
        type: Array,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
});

const collection = "GAMES"

module.exports = Game = mongoose.model("game", GameSchema, collection);