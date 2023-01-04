const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    OWNER: {
        type: String,
        required: true
    },
    TNAME: {
        type: String,
        required: true
    },
    MEMBERS: {
        type: Array,
        required: true
    },
    TOURNAMENT_WINS: {
        type: Number,
        required: true
    },
    SCRIM_WINS: {
        type: Number,
        required: true
    },
    GAMES: {
        type: Array,
        required: true
    },
    LOGO_URL: {
        type: String,
        required: true
    },
    LOGO_FLAG: {
        type: Boolean,
        required: false
    },
    BADGES: {
        type: Array,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    }
});

const collection = "TEAMS"

module.exports = Team = mongoose.model("team", TeamSchema, collection);