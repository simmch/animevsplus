const card_creation_prompt_function = (name, universe) => {
    prompt_text = `
    In a card game with the following character data required, please fill out the form for the character ${name} from the ${universe} manga / anime with as much accuracy as possible to the characters abilities we see in the source material following the instructions below.

    Available Card Classes are as follows = ["Fighter", "Mage", "Ranger", "Tank", "Healer", "Assassin", "Swordsman", "Summoner", "Monstrosity"]
    - Fighter: A character that specializes in close range combat and uses no weapons.
    - Mage: A character that specializes in long range combat with magic and does not heal.
    - Ranger: A character that specializes in long range combat with weapons.
    - Tank: A character that specializes in defensive combat.
    - Healer: A character that specializes in healing.
    - Assassin: A character that specializes in close range combat using poisons and other devious tricks.
    - Swordsman: A character that specializes in close range combat with swords.
    - Summoner: A character that specializes in summoning.
    - Monstrosity: A character that is largely a monster..

    Available Elements =  [
        "Physical",
        "Fire",
        "Ice",
        "Water",
        "Earth",
        "Electric",
        "Wind",
        "Psychic",
        "Death",
        "Life",
        "Light",
        "Dark",
        "Poison",
        "Ranged",
        "Spirit",
        "Recoil",
        "Time",
        "Bleed",
        "Gravity"
    ]
    
    Weaknesses, Resistances, Repels, Immunity, and Absorbs are all based on Elements.
    
    Enhancement and Passive Ability Types and Effects = [
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
    'FEAR',
    'SOULCHAIN',
    'GAMBLE',
    'WAVE',
    'CREATION',
    'BLAST',
    'DESTRUCTION',
    ]
    
    Tiers are 1 to 7, with  1 being the weakest and 7 being the strongest. The Tier breakdown for adjustable stats are as follows - (Attack_Defense value needs to be split between attack and defense. For example, if the card is Tier 5 and the Attack_Defense value is 450, the Attack value can be 200 while defense can be 250. Likewise, the Ability_Power_Values is splitable for normal attack power, special attack power, and ultimate attack power).
    1: {
        Health: 1725,
        Attack_Defense: 325,
        Ability_Power_Values: 500
    },
    2: {
        Health: 1750,
        Attack_Defense: 350,
        Ability_Power_Values: 550
    },
    3: {
        Health: 1800,
        Attack_Defense: 400,
        Ability_Power_Values: 600
    },
    4: {
        Health: 1850,
        Attack_Defense: 425,
        Ability_Power_Values: 650
    },
    5: {
        Health: 1900,
        Attack_Defense: 450,
        Ability_Power_Values: 700
    },
    6: {
        Health: 1950,
        Attack_Defense: 475,
        Ability_Power_Values: 750
    },
    7: {
        Health: 2000,
        Attack_Defense: 500,
        Ability_Power_Values: 800
    }

    The Speed stat is based on the following:
    1 to 100 with 1 being the absolute slowest and 100 being near instantaneous speed.
    
    Please Fill out the card information below, as accurate to the source as possible, with the following format that is provided below:
    card_class:
    tier:
    health:
    attack:
    defense:
    speed:
    passive_ability_name:
    passive_ability_type:
    normal_attack_name:
    normal_attack_power: 
    normal_attack_element:
    special_attack_name:
    special_attack_power: 
    special_attack_element:
    ultimate_attack_name:
    ultimate_attack_power: 
    ultimate_attack_element:
    enhancement_ability_name:
    enhancement_ability_type: 
    weaknesses: [] Put this in string array, leave empty if none
    resistances:  [] Put this in string array, leave empty if none
    repels: [] Put this in string array, leave empty if none
    immunity: [] Put this in string array, leave empty if none
    absorbs: [] Put this in string array, leave empty if none
    potential_ability1_name:
    potential_ability1_element:
    potential_ability1_power:
    potential_ability2_name:
    potential_ability2_element:
    potential_ability2_power:
    potential_ability3_name:
    potential_ability3_element:
    potential_ability3_power:
    potential_ability4_name:
    potential_ability4_element:
    potential_ability4_power:
    potential_ability5_name:
    potential_ability5_element:
    potential_ability5_power:
    `;
    return prompt_text;
}

module.exports = {
    card_creation_prompt_function
}