const mongoose = require("mongoose");

const ScenarioSchema = new mongoose.Schema({
    TITLE: {
        type: String,
        required: true
    },
    IMAGE: {
        type: String,
        required: true
    },
    ENEMY_LEVEL: {
        type: Number,
        required: true
    },
    ENEMIES: {
        type: Array,
        required: true
    },
    EASY_DROPS: {
        type: Array,
        required: true
    },
    NORMAL_DROPS: {
        type: Array,
        required: true
    },
    HARD_DROPS: {
        type: Array,
        required: true
    },
    UNIVERSE: {
        type: String,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    }
});

const collection = "SCENARIO"

module.exports = Scenario = mongoose.model("scenario", ScenarioSchema, collection);