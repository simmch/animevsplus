const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    DISNAME: {
        type: String,
        Arrayrequired: false
    },
    NAME: {
        type: String,
        Arrayrequired: false
    },
    DID: {
        type: String,
        Arrayrequired: false
    },
    AVATAR: {
        type: String,
        Arrayrequired: false
    },
    IGN: [{
        DEFAULT: String
    }],
    GAMES: {
        type: Array,
        Arrayrequired: false
    },
    GUILD: {
        type: String,
        Arrayrequired: false
    },
    TEAM: {
        type: String,
        Arrayrequired: false
    },
    FAMILY: {
        type: String,
        required: false
    },
    TITLE: {
        type: String,
        Arrayrequired: false
    },
    CARD: {
        type: String,
        Arrayrequired: false
    },
    ARM: {
        type: String,
        Arrayrequired: false
    },
    DECK: {
        type: Array,
        Arrayrequired: false
    },
    TALISMAN: {
        type: String,
        Arrayrequired: false
    },
    PET: {
        type: String,
        Arrayrequired: false
    },
    TOURNAMENT_WINS: {
        type: Number,
        Arrayrequired: false
    },
    TOURNAMENT_LOSSES: {
        type: Number,
        Arrayrequired: false
    },
    AVAILABLE: {
        type: Boolean,
        Arrayrequired: false
    },
    CROWN_TALES: {
        type: Array,
        Arrayrequired: false
    },
    DUNGEONS: {
        type: Array,
        Arrayrequired: false
    },
    BOSS_WINS: {
        type: Array,
        Arrayrequired: false
    },
    REFERRED: {
        type: Boolean,
        Arrayrequired: false
    },
    REFERRER: {
        type: String,
        Arrayrequired: false
    },
    TIMESTAMP: {
        type: String,
        Arrayrequired: false
    },
    IS_ADMIN: {
        type: Boolean,
        Arrayrequired: false
    },
    U_PRESET: {
        type: Boolean,
        Arrayrequired: false
    },
    RIFT: {
        type: Number,
        Arrayrequired: false
    },
    REBIRTH: {
        type: Number,
        Arrayrequired: false
    },
    RETRIES: {
        type: Number,
        Arrayrequired: false
    },
    PRESTIGE: {
        type: Number,
        Arrayrequired: false
    },
    PATRON: {
        type: Boolean,
        Arrayrequired: false
    },
    LEVEL: {
        type: Number,
        Arrayrequired: false
    },
    PVP_WINS: {
        type: Number,
        Arrayrequired: false
    },
    PVP_LOSS: {
        type: Number,
        Arrayrequired: false
    },
    EXPLORE: {
        type: Boolean,
        Arrayrequired: false
    },
    SAVE_SPOT: {
        type: Array,
        Arrayrequired: false
    },
    RPG_LEVELS: {
        type: Array,
        Arrayrequired: false
    },
    PERFORMANCE: {
        type: Boolean,
        Arrayrequired: false
    },
    TRADING: {
        type: Boolean,
        Arrayrequired: false
    },
    TEXT_ONLY: {
        type: Boolean,
        Arrayrequired: false
    },
    BOSS_FOUGHT: {
        type: Boolean,
        Arrayrequired: false
    },
    AUTOSAVE: {
        type: Boolean,
        Arrayrequired: false
    },
    SERVER: {
        type: String,
        Arrayrequired: false
    },
    DIFFICULTY: {
        type: String,
        Arrayrequired: false
    },
    STORAGE_TYPE: {
        type: Number,
        Arrayrequired: false
    },
    CREATOR: {
        type: Boolean,
        Arrayrequired: false
    },
    VOTED: {
        type: Boolean,
        Arrayrequired: false
    },
    USED_CODES: {
        type: Array,
        Arrayrequired: false
    },
    BATTLE_HISTORY: {
        type: Number,
        Arrayrequired: false
    },
    SCENARIO_HISTORY: {
        type: Array,
        Arrayrequired: false
    },
    FAMILY_PET: {
        type: Boolean,
        Arrayrequired: false
    },
    EXPLORE_LOCATION: {
        type: String,
        Arrayrequired: false
    },
    FAMILY_DID: {
        type: String,
        Arrayrequired: false
    },
    BALANCE: {
        type: Number,
        Arrayrequired: false
    },
    CARDS: {
        type: Array,
        Arrayrequired: false
    },
    TITLES: {
        type: Array,
        Arrayrequired: false
    },
    ARMS: {
        type: Array,
        Arrayrequired: false
    },
    ESSENCE: {
        type: Array,
        Arrayrequired: false
    },
    PETS: {
        type: Array,
        Arrayrequired: false
    },
    CARD_LEVELS: {
        type: Array,
        Arrayrequired: false
    },
    QUESTS: {
        type: Array,
        Arrayrequired: false
    },
    DESTINY: {
        type: Array,
        Arrayrequired: false
    },
    GEMS: {
        type: Array,
        Arrayrequired: false
    },
    STORAGE: {
        type: Array,
        Arrayrequired: false
    },
    TSTORAGE: {
        type: Array,
        Arrayrequired: false
    },
    ASTORAGE: {
        type: Array,
        Arrayrequired: false
    },
    TALISMANS: {
        type: Array,
        Arrayrequired: false
    },
    EQUIPPED_SUMMON: {
        type: String,
        Arrayrequired: false
    }
});

const collection = "USERS";

module.exports = User = mongoose.model("user", UserSchema, collection);