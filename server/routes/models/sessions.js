const mongoose = require("mongoose");

const SessionsSchema = new mongoose.Schema({
    OWNER: {
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
    TEAMS: {
        type: Array,
        required: true
    },
    GODS: {
        type: Boolean,
        required: true
    },
    GODS_TITLE: {
        type: String,
        required: true
    },
    TOURNAMENT: {
        type: Boolean,
        required: true
    },
    SCRIM: {
        type: Boolean,
        required: true
    },
    KINGSGAMBIT: {
        type: Boolean,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    IS_FULL: {
        type: Boolean,
        required: true
    },
    WINNING_TEAM: {
        type: String,
        required: true
    },
    LOSING_TEAM: {
        type: String,
        required: true
    },
    WINNER: {
        type: String,
        required: true
    },
    LOSER: {
        type: String,
        required: true
    },
    CROWN_UNLIMITED: {
        type: Boolean,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now,
    }
});

const collection = "SESSIONS"

module.exports = Sessios = mongoose.model("sessions", SessionsSchema, collection);