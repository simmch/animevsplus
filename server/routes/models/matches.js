const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema({
    PLAYER: {
        type: String,
        required: true
    },
    CARD: {
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
    UNIVERSE: {
        type: String,
        required: true
    },
    UNIVERSE_TYPE: {
        type: String,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now,
    }
});

const collection = "MATCHES"

module.exports = Matches = mongoose.model("matches", MatchesSchema, collection);