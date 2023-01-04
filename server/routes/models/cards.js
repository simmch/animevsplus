const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: true
    },

    RNAME: {
        type: String,
        required: true
    },
    PATH: {
        type: String,
        required: true
    },
    FPATH: {
        type: String,
        required: true
    },

    RPATH: {
        type: String,
        required: true
    },
    GIF: {
        type: String,
        required: true
    },
    PRICE: {
        type: Number,
        required: true
    },
    MOVESET: {
        type: Array,
        required: true
    },
    PASS: {
        type: Array,
        required: true
    },
    HLT: {
        type: Number,
        required: true
    },
    STAM: {
        type: Number,
        required: true
    },
    ATK: {
        type: Number,
        required: true
    },
    DEF: {
        type: Number,
        required: true
    },
    SPD:{
        type: Number,
        required: true
    },
    TIER:{
        type: Number,
        required: true
    },
    TYPE:{
        type: Number,
        required: false
    },
    VUL: {
        type: Boolean,
        required: true
    },
    COLLECTION: {
        type: String,
        required: true
    },
    HAS_COLLECTION: {
        type: Boolean,
        required: true
    },
    UNIVERSE: {
        type: String,
        required: true
    },
    TIMESTAMP: {
        type: Date,
        default: Date.now
    },
    STOCK: {
        type: Number,
        required: true
    },
    AVAILABLE: {
        type: Boolean,
        required: true
    },
    EXCLUSIVE: {
        type: Boolean,
        required: true
    },
    DESCRIPTIONS: {
        type: Array,
        required: true
    },
    IS_SKIN: {
        type: Boolean,
        required: true
    },
    SKIN_FOR: {
        type: String,
        required: true
    },
    WEAKNESS : {
        type: Array,
        required: true
    },
    RESISTANT: {
        type: Array,
        required: true
    },
    REPEL: {
        type: Array,
        required: true
    },
    IMMUNE: {
        type: Array,
        required: true
    },
    ABSORB: {
        type: Array,
        required: true
    }

});

const collection = "CARDS"

module.exports = Card = mongoose.model("card", CardSchema, collection);