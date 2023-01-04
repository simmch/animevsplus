const mongoose = require("mongoose");

const VaultSchema = new mongoose.Schema({
    OWNER: {
        type: String,
        required: true
    },
    BALANCE: {
        type: Number,
        required: true
    },
    CARDS: {
        type: String,
        required: true
    },
    TITLES: {
        type: Array,
        required: true
    },
    ARMS: {
        type: Array,
        required: true
    },
    PETS: {
        type: Array,
        required: true
    },
    DECK: {
        type: Array,
        required: true
    },
    QUEST: {
        type: Array,
        required: false
    },
    DESTINY: {
        type: Array,
        required: true
    }
});

const collection = "VAULT"

module.exports = Vault = mongoose.model("vault", VaultSchema, collection);