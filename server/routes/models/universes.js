const mongoose = require("mongoose");

const UniverseSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    CROWN_TALES: {
        type: Array,
    },
    DUNGEONS: {
        type: Array,
    },
    PREREQUISITE: {
        type: String,
    },
    UNIVERSE_BOSS: {
        type: String,
    },
    CORRUPTED: {
        type: Boolean,
    },
    HAS_CROWN_TALES: {
        type: Boolean,
    },
    HAS_DUNGEON: {
        type: Boolean,
    },
    UTITLE: {
        type: String,
    },
    UARM: {
        type: String,
    },
    DTITLE: {
        type: String,
    },
    DARM: {
        type: String,
    },
    UPET: {
        type: String,
    },
    DPET: {
        type: String,
    },
    GUILD: {
        type: String,
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    TIER: {
        type: Number,
    },
    CORRUPTION_LEVEL: {
        type: Number,
    }

});

const collection = "UNIVERSE"

module.exports = Universe = mongoose.model("universe", UniverseSchema, collection);