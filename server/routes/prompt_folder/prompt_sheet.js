const card_creation_prompt_function = (name, universe) => {
    prompt_text = `
    In a card game with the following character data required, please fill out the form for the character ${name} from the ${universe} manga / anime with as much accuracy as possible to the characters abilities we see in the source material following the instructions below.

    Available Card Classes are as follows = ["Fighter", "Mage", "Ranger", "Tank", "Healer", "Assassin", "Swordsman", "Summoner", "Monstrosity"]
    - Fighter: This character specializes in close range combat and uses no weapons.
    - Mage: This character specializes in long range combat with magic and does not heal.
    - Ranger: This character specializes in long range combat with weapons.
    - Tank: This character specializes in defensive combat.
    - Healer: This character specializes in healing.
    - Assassin: This character specializes in close range combat using poisons and other devious tricks.
    - Swordsman: This character specializes in close range combat with swords.
    - Summoner: This character specializes in summoning.
    - Monstrosity: This character is largely a monster.

    Available Elements for Moves =  [
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
    
    Tiers are 1 to 10, with  1 being the weakest and 10 being the strongest.

    The combat style is based on if the character is OFFENSIVE, DEFENSIVE, or BALANCED. The combat_style can only be one of the three, based on how they fight in the anime or manga.

    The Speed stat is based on the following:
    1 to 100 with 1 being the absolute slowest and 100 being near instantaneous speed.
    
    Please Fill out the card information below, as accurate to the source as possible, with the following format that is provided below:
    card_class:
    tier:
    combat_style:
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