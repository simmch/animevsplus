const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: false
    },

    RNAME: {
        type: String,
        required: false
    },
    PATH: {
        type: String,
        required: false
    },
    FPATH: {
        type: String,
        required: false
    },

    RPATH: {
        type: String,
        required: false
    },
    GIF: {
        type: String,
        required: false
    },
    PRICE: {
        type: Number,
        required: false
    },
    MOVESET: {
        type: Array,
        required: false
    },
    PASS: {
        type: Array,
        required: false
    },
    HLT: {
        type: Number,
        required: false
    },
    STAM: {
        type: Number,
        required: false
    },
    ATK: {
        type: Number,
        required: false
    },
    DEF: {
        type: Number,
        required: false
    },
    SPD:{
        type: Number,
        required: false
    },
    TIER:{
        type: Number,
        required: false
    },
    TYPE:{
        type: Number,
        required: false
    },
    VUL: {
        type: Boolean,
        required: false
    },
    UNIVERSE: {
        type: String,
        required: false
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    AVAILABLE: {
        type: Boolean,
        required: false
    },
    DESCRIPTIONS: {
        type: Array,
        required: false
    },
    IS_SKIN: {
        type: Boolean,
        required: false
    },
    SKIN_FOR: {
        type: String,
        required: false
    },
    WEAKNESS : {
        type: Array,
        required: false
    },
    RESISTANT: {
        type: Array,
        required: false
    },
    REPEL: {
        type: Array,
        required: false
    },
    IMMUNE: {
        type: Array,
        required: false
    },
    ABSORB: {
        type: Array,
        required: false
    },
    CLASS: {
        type: String,
        required: false
    },
    DROP_STYLE: {
        type: String,
        required: false
    },
    ID: {
        type: String,
        required: false
    },

});

const collection = "CARDS"

module.exports = Card = mongoose.model("card", CardSchema, collection);