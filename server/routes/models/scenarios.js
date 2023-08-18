const mongoose = require("mongoose");

const ScenarioSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: false
    },
    MUST_COMPLETE: {
        type: Array,
        required: false
    },
    IS_RAID: {
        type: Boolean,
        required: false
    },
    IS_DESTINY: {
        type: Boolean,
        required: false
    },
    IMAGE: {
        type: String,
        required: false
    },
    ENEMY_LEVEL: {
        type: Number,
        required: false
    },
    ENEMIES: {
        type: Array,
        required: false
    },
    EASY_DROPS: {
        type: Array,
        required: false
    },
    NORMAL_DROPS: {
        type: Array,
        required: false
    },
    HARD_DROPS: {
        type: Array,
        required: false
    },
    UNIVERSE: {
        type: String,
        required: false
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    TACTICS: {
        type: Array,
        required: false
    },
    DESTINY_CARDS: {
        type: Array,
        required: false
    },
    LOCATIONS: {
        type: Array,
        required: false
    },
    
});

const collection = "SCENARIO"

module.exports = Scenario = mongoose.model("scenario", ScenarioSchema, collection);