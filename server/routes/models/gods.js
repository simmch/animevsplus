const mongoose = require("mongoose");

const GodsSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    GAME: {
        type: String,
        required: true
    },
    TYPE: {
        type: Number,
        required: true
    },
    IMG_URL: {
        type: String,
        required: true
    },
    REWARD: {
        type: Number,
        required: true
    },
    ARCHIVED: {
        type: Boolean,
        required: true
    },
    TEAM_FLAG: {
        type: Boolean,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    REGISTRATION: {
        type: Boolean,
        required: true
    },
    PARTICIPANTS: {
        type: Array,
        required: true
    },
    WINNER: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now,
    }
});

const collection = "GODS"

module.exports = Gods = mongoose.model("gods", GodsSchema, collection);