const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    DISNAME: {
        type: String,
        required: true
    },
    NAME: {
        type: String,
        required: true
    },
    DID: {
        type: String,
        required: true
    },
    AVATAR: {
        type: Array,
        required: true
    },
    IGN: {
        type: Array,
        required: true
    },
    GAMES: {
        type: Array,
        required: true
    },
    TEAM: {
        type: String,
        required: true
    },
    FAMILY: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        required: true
    },
    CARD: {
        type: String,
        required: true
    },
    DECK: {
        type: Array,
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
    MATCHES: {
        type: Array,
        required: true
    },
    TOURNAMENT_WINS: {
        type: Number,
        required: true
    },
    AVAILABLE: {
        type: String,
        required: true
    },
    CROWN_TALES: {
        type: Array,
        required: true
    },
    DUNGEONS: {
        type: Array,
        required: true
    },
    REFERRED: {
        type: String,
        required: true
    },
    REFERRER: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    IS_ADMIN: {
        type: Boolean,
        required: true,
        default: false
    }
});

const collection = "USERS"

module.exports = User = mongoose.model("user", UserSchema, collection);