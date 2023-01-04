import moment from 'moment';
export const cardInitialState = {
    PATH: '',
    FPATH: '',
    RPATH: '',
    GIF: 'N/A',
    NAME: '',
    RNAME: 'N/A',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    MOVESET: {},
    HLT: null,
    STAM: 100,
    ATK: 0,
    DEF: 0,
    TYPE: 0,
    TIER: 1,
    PASS: [],
    SPD: 50,
    VUL: false,
    UNIVERSE: '',
    COLLECTION: 'N/A',
    HAS_COLLECTION: null,
    STOCK: 99,
    AVAILABLE: true,
    DESCRIPTIONS: [],
    EXCLUSIVE: true,
    IS_SKIN: false,
    SKIN_FOR: 'N/A',
    WEAKNESS: [],
    RESISTANT: [],
    REPEL: [],
    IMMUNE: [],
    ABSORB: []
}

export const armInitialState = {
    ARM: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 99,
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const universeInitialState = {
    TITLE: '',
    PATH: '',
    CROWN_TALES: [],
    DUNGEONS: [],
    HAS_CROWN_TALES: false,
    HAS_DUNGEON: false,
    PREREQUISITE: '',
    UTITLE: '',
    UARM: '',
    DTITLE: '',
    DARM: '',
    DPET: '',
    UPET: '',
    GUILD: '',
    UNIVERSE_BOSS: '',
    CORRUPTION_LEVEL: 0,
    TIER: 0,
    CORRUPTED: false
}

export const scenarioInitialState = {
    TITLE: '',
    IMAGE: '',
    ENEMY_LEVEL: 0,
    ENEMIES: [],
    EASY_DROPS: [],
    NORMAL_DROPS: [],
    HARD_DROPS: [],
    UNIVERSE: '',
    AVAILABLE: true
}

export const abyssInitialState = {
    FLOOR: 0,
    ENEMIES: [],
    BANNED_CARDS: [],
    BANNED_TITLES: [],
    BANNED_ARMS: [],
    BANNED_UNIVERSES: [],
    BANNED_TIERS: [],
    BANNED_PETS: [],
    TITLE: '',
    ARM: '',
    PET: '',
    SPECIAL_BUFF: 0
}

export const titleInitialState = {
    TITLE: '',
    PRICE: null,
    TOURNAMENT_REQUIREMENTS: 0,
    ABILITIES: [],
    UNIVERSE: '',
    COLLECTION: 'N/A',
    STOCK: 99,
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const petInitialState = {
    PET: '',
    PATH: '',
    UNIVERSE: '',
    LVL: 1,
    ABILITIES: [],
    COLLECTION: 'N/A',
    AVAILABLE: true,
    EXCLUSIVE: true
}

export const enhancements = [
    'ATK',
    'DEF',
    'STAM',
    'HLT',
    'LIFE',
    'DRAIN',
    'FLOG',
    'WITHER',
    'RAGE',
    'BRACE',
    'BZRK',
    'CRYSTAL',
    'GROWTH',
    'STANCE',
    'CONFUSE',
    'BLINK',
    'SLOW',
    'HASTE',
    'SOULCHAIN',
    'GAMBLE',
    'FEAR',
    'WAVE',
    'BLAST',
    'CREATION',
    'DESTRUCTION'
]

export const elements = [
    "PHYSICAL",
    "FIRE",
    "ICE",
    "WATER",
    "EARTH",
    "ELECTRIC",
    "WIND",
    "PSYCHIC",
    "DEATH",
    "LIFE",
    "LIGHT",
    "DARK",
    "POISON",
    "RANGED",
    "SPIRIT",
    "BLEED",
    "TIME",
    "GRAVITY",
    "RECOIL"
]

export const arm_enhancements = [
    'BASIC',
    'SPECIAL',
    'ULTIMATE',
    'MANA',
    'SHIELD',
    'ULTIMAX',
    'BARRIER',
    'PARRY',
    'SIPHON'
]
