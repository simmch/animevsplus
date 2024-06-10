import moment from 'moment';
export const cardInitialState = {
    PATH: 'https://res.cloudinary.com/dkcmq8o15/image/upload/v1692250354/testfocus.png',
    FPATH: 'https://res.cloudinary.com/dkcmq8o15/image/upload/v1692250354/testfocus.png',
    RPATH: 'https://res.cloudinary.com/dkcmq8o15/image/upload/v1692250354/testfocus.png',
    GIF: 'N/A',
    NAME: '',
    RNAME: 'N/A',
    PRICE: 0,
    MOVESET: {},
    HLT: null,
    STAM: 100,
    ATK: null,
    DEF: null,
    TYPE: 0,
    TIER: 0,
    PASS: [],
    SPD: null,
    VUL: false,
    UNIVERSE: '',
    AVAILABLE: true,
    DESCRIPTIONS: [],
    IS_SKIN: false,
    SKIN_FOR: 'N/A',
    WEAKNESS: [],
    RESISTANT: [],
    REPEL: [],
    IMMUNE: [],
    ABSORB: [],
    CLASS: 'N/A',
    DROP_STYLE: 'TALES',
    ID: '',
}

export const speedTypes = [
    'SLOW',
    'AVERAGE',
    'FAST',
    'GODLY'
]


export const armInitialState = {
    ARM: '',
    PRICE: 0,
    ABILITIES: [],
    UNIVERSE: '',
    AVAILABLE: true,
    DROP_STYLE: '',
    ID: '',
    ELEMENT: '',
}

export const titleInitialState = {
    TITLE: '',
    ABILITIES: [],
    UNIVERSE: '',
    AVAILABLE: true,
    RARITY: '',
    UNLOCK_METHOD: {},
    ID: '',
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
    MUST_COMPLETE: [],
    IS_RAID: false,
    IMAGE: '',
    ENEMY_LEVEL: 0,
    ENEMIES: [],
    EASY_DROPS: [],
    NORMAL_DROPS: [],
    HARD_DROPS: [],
    UNIVERSE: '',
    AVAILABLE: true,
    DESTINY_CARDS: [],
    LOCATIONS: [],
    TACTICS: [],
    IS_DESTINY: false,
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

export const petInitialState = {
    PET: '',
    PATH: '',
    UNIVERSE: '',
    ABILITIES: [],
    AVAILABLE: true,
    DROP_STYLE: ''
}

export const tactics = [
    'ENRAGE',
    'OVERWHELMING POWER',
    'DAMAGE CHECK',
    'DEVASTATING BLOW',
    'DEATH BLOW',
    'ALMIGHTY WILL',
    'STAGGER',
    'PROVOKED',
    'INTIMIDATION',
    'PETRIFIED FEAR',
    'BLOODLUST'
]


export const title_explanations = {
    'ATK': 'Increases your attack by % each turn',
    'DEF': 'Increases your defense by % each turn',
    'STAM': 'Increases your stamina by % each turn',
    'HLT': ' Heals you for % of your current health each turn',
    'LIFE': 'Steals % of your opponent\'s health each turn',
    'DRAIN': 'Drains % opponent stamina each turn',
    'FLOG': 'Steals % opponent attack each turn',
    'WITHER': 'Steals % opponent defense each turn',
    'RAGE': 'Decreases your defense to increase your AP by % each turn',
    'BRACE': 'Decreases your attack to increase your AP by % each turn',
    'BZRK': 'Decreases your health to increase your attack by % each turn',
    'CRYSTAL': 'Decreases your health to increase your defense by % each turn',
    'GROWTH': 'Decreases your max health to increase your attack, defense, and AP by % each turn',
    'FEAR': 'Decreases your max health to decrease your opponent\'s attack, defense, and AP by % each turn',
    'STANCE': 'Swaps your attack and defense stats, increasing your attack by % each turn',
    'CONFUSE': 'Swaps opponent\'s attack and defense stats, decreasing their attack by % each turn',
    'CREATION': 'Increases your max health by % each turn',
    'DESTRUCTION': 'Decreases opponent\'s max health by % each turn',
    'SPEED': 'Increases your speed by % each focus',
    'SLOW': ' Decreases turn count by  Turn',
    'HASTE': ' Increases turn count by  Turn',
    'SOULCHAIN': 'Prevents focus stat buffs',
    'GAMBLE': 'Randomizes focus stat buffs',
    'SINGULARITY': 'Increases resolve buff by %',
    'IQ': ' Increases focus buffs by  %',
    'HIGH IQ': 'Continues focus buffs after resolve',
    'BLITZ': 'Hit through parries',
    'FORESIGHT': 'Parried hits deal 10% damage to yourself',
    'OBLITERATE': 'Hit through shields',
    'IMPENETRABLE SHIELD': 'Shields cannot be penetrated',
    'PIERCE': 'Hit through all barriers',
    'SYNTHESIS': 'Hits to your barriers store 50% of damage dealt, you heal from this amount on resolve.',
    'SPELL SHIELD': 'All shields will absorb elemental damage healing you',
    'ELEMENTAL BUFF': 'Increase elemental damage by 50%',
    'ELEMENTAL DEBUFF': 'Decrease opponent\'s elemental damage by 50%',
    'ENHANCED GUARD': 'Negates 80% of damage when blocking, prevents critical hits.',
    'STRATEGIST': 'Hits through all guards / protections',
    'SHARPSHOOTER': 'Attacks never miss',
    'DIVINITY': 'Ignore elemental effects until resolved',
}

// Unlock Methods
// # Tales completed {TYPE: "TALES", "VALUE": "1"}
// # Dungeons completed {TYPE: "DUNGEONS", "VALUE": "1"}
// # Scenarios completed {TYPE: "SCENARIOS", "VALUE": "1"}
// # Specific Element Damage Dealt in universe {TYPE: "ELEMENT", "VALUE": "100"}
// # Total Damage Dealt in universe {TYPE: "TOTAL_DAMAGE", "VALUE": "100"}
// # Bosses beat in universe {TYPE: "BOSS", "VALUE": "1"}
// # None / Picked from scenario window
// {TYPE: "", "VALUE": ""}
export const unlock_methods = [
    'TALES COMPLETED',
    'TALES RUN',
    'HEALED IN TALES',
    'DAMAGE TAKEN IN TALES',
    'DAMAGE DEALT IN TALES',
    'DUNGEONS COMPLETED',
    'DUNGEONS RUN',
    'HEALED IN DUNGEONS',
    'DAMAGE TAKEN IN DUNGEONS',
    'DAMAGE DEALT IN DUNGEONS',
    'ELEMENTAL DAMAGE DEALT'
]

export const title_abilities = [
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
    'FEAR',
    'STANCE',
    'CONFUSE',
    'CREATION',
    'DESTRUCTION',
    'SPEED',
    'SLOW',
    'HASTE',
    'SOULCHAIN',
    'GAMBLE',
    'SINGULARITY',
    'IQ',
    'HIGH IQ',
    'BLITZ',
    'FORESIGHT',
    'OBLITERATE',
    'IMPENETRABLE SHIELD',
    'PIERCE',
    'SYNTHESIS',
    'SPELL SHIELD',
    'ELEMENTAL BUFF',
    'ELEMENTAL DEBUFF',
    'ENHANCED GUARD',
    'STRATEGIST',
    'SHARPSHOOTER',
    'DIVINITY',
]

export const drop_styles = [
    "TALES",
    "DUNGEON",
    "SCENARIO",
    "BOSS",
    "RAID",
    "DESTINY"
]

export const classes = [
    'FIGHTER', // Starts each fight with 3 Parrys
    'MAGE', // Increases elemental damage by 30%
    'TANK', // Starts each fight with Rarity * 200 Shield
    'RANGER', // Starts each fight with 3 barriers
    'HEALER', // Stores 20% of damage taken and heals for the total amount each focus
    'ASSASSIN', // First 3 attacks cost no stamina
    'SUMMONER', // Can user summon from start of the match
    'SWORDSMAN', // At resolve gain 3 critical strikes
    'MONSTROSITY', // On resolve gain 2 Double Strikes
]

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
    "GUN",
    "NATURE",
    "SLEEP",
    "BLEED",
    "TIME",
    "GRAVITY",
    "RECKLESS",
    "BARRIER",
    "PARRY",
    "SHIELD",
    "N/A"
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
