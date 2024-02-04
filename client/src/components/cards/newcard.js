import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { cardInitialState, enhancements, elements, classes, drop_styles } from '../STATE'
import { saveCard } from '../../actions/cards'
import CardAbilities from './card_abilities'

export const NewCard = ({auth, cards, history, saveCard}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });

    const [cardData, setCardData] = useState({
        loading: true
    });
    const [defaults, setDefaults] = useState({
        apValues: 0,
        atkDef: 0, 
        ad_points_left: 0,
        ap_points_left: 0
    })
    const [moveOptions, setMoveOptions] = useState({
        POTENTIAL_MOVE1: "",
        POTENTIAL_MOVE1_ELEMENT: "",
        POTENTIAL_MOVE1_POWER: null,
        POTENTIAL_MOVE2: "",
        POTENTIAL_MOVE2_ELEMENT: "",
        POTENTIAL_MOVE2_POWER: null,
        POTENTIAL_MOVE3: "",
        POTENTIAL_MOVE3_ELEMENT: "",
        POTENTIAL_MOVE3_POWER: null,
        POTENTIAL_MOVE4: "",
        POTENTIAL_MOVE4_ELEMENT: "",
        POTENTIAL_MOVE4_POWER: null,
        POTENTIAL_MOVE5: "",
        POTENTIAL_MOVE5_ELEMENT: "",
        POTENTIAL_MOVE5_POWER: null,
    })
    const [images, setImages] = useState({
        loading: true,
        images_available: false,
        base_image_url: "",
        focus_image_url: "",
        resolve_image_url: "",
        list_of_images: []
    })
    const [gifs, setGifs] = useState({
        loading: true,
        gifs_available: false,
        list_of_gifs: []
    })
    const [additionals, setAdditionals] = useState({
        loading: true,
        data: ""
    })
    const [additionalAbilityToggle, setAdditionalAbilityToggle] = useState(false);
    const [selectImageToggle, setSelectImageToggle] = useState(false);
    const [insertImageToggle, setInsertImageToggle] = useState(false);
    const [selectGifToggle, setSelectGifToggle] = useState(false);
    const [insertGifToggle, setInsertGifToggle] = useState(false);
    const [aiToggle, setAiToggle] = useState(false);
    const [aiToggleLoading, setAiToggleLoading] = useState(false);
    const [aiToggleFailure, setAiToggleFailure] = useState(false);
    const [data, setData] = useState(cardInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const [combatStyle, setCombatStyle] = useState({
        COMBAT_STYLE: ""
    });
    const [batchJob, setBatchJob] = useState(false);

    const [moves, setMoves] = useState({
        MOVE1_ABILITY: "",
        MOVE1_POWER: null,
        MOVE1_ELEMENT: "",
        MOVE2_ABILITY: "",
        MOVE2_POWER: null,
        MOVE2_ELEMENT: "",
        MOVE3_ABILITY: "",
        MOVE3_POWER: null,
        MOVE3_ELEMENT: "",
        ENHANCER_ABILITY: "",
        ENHANCER_POWER: null,
        ENHANCEMENT_TYPE: ""
    });
    // Build Moves
    var move1Object = {}
    var move2Object = {}
    var move3Object = {}
    var enhancerObject = {}
    var movesArray = []

    const {PATH, FPATH, RPATH, GIF, NAME, RNAME, PRICE, MOVESET, HLT, STAM, ATK, DEF, TYPE, TIER, PASS, SPD, VUL, UNIVERSE, AVAILABLE, DESCRIPTIONS, IS_SKIN, SKIN_FOR, WEAKNESS, RESISTANT, REPEL, IMMUNE, ABSORB, CLASS, DROP_STYLE, ID} = data;
    const {MOVE1_ABILITY, MOVE1_POWER, MOVE1_ELEMENT, MOVE2_ABILITY, MOVE2_POWER, MOVE2_ELEMENT, MOVE3_ABILITY, MOVE3_POWER, MOVE3_ELEMENT, ENHANCER_ABILITY,ENHANCEMENT_TYPE, ENHANCER_POWER} = moves;
    if({...moves}){
        move1Object[MOVE1_ABILITY] = MOVE1_POWER
        move1Object['STAM'] = 10
        move1Object['ELEMENT'] = MOVE1_ELEMENT
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        move2Object['ELEMENT'] = MOVE2_ELEMENT

        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        move3Object['ELEMENT'] = MOVE3_ELEMENT
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
    }
    
    useEffect(() => {
        // if (!auth.isAuthenticated) {
        //   history.push('/login')
        // }

        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
            })
            axios.get('/crown/cards')
                .then((res) => {
                    setCardData({data: res.data, loading: false})
            })
        }

      }, [data, moves, auth])


    const tierConfig = { 
        1: {
            HLT: 1725,
            atkDef: 325,
            apValues: 500,
            enhancement_value: 3,
            enhancer_value: 10,
        },
        2: {
            HLT: 1750,
            atkDef: 350,
            apValues: 550,
            enhancement_value: 5,
            enhancer_value: 15,
        },
        3: {
            HLT: 1800,
            atkDef: 400,
            apValues: 600,
            enhancement_value: 7,
            enhancer_value: 10,
            enhancer_value: 25,
        },
        4: {
            HLT: 1850,
            atkDef: 425,
            apValues: 650,
            enhancement_value: 9,
            enhancer_value: 30,
        },
        5: {
            HLT: 1900,
            atkDef: 450,
            apValues: 700,
            enhancement_value: 11,
            enhancer_value: 38,
        },
        6: {
            HLT: 1950,
            atkDef: 475,
            apValues: 750,
            enhancement_value: 13,
            enhancer_value: 45,
        },
        7: {
            HLT: 2000,
            atkDef: 500,
            apValues: 800,
            enhancement_value: 15,
            enhancer_value: 50,
        },
        8: {
            HLT: 2050,
            atkDef: 525,
            apValues: 850,
            enhancement_value: 17,
            enhancer_value: 58,
        },
        9: {
            HLT: 2100,
            atkDef: 550,
            apValues: 900,
            enhancement_value: 19,
            enhancer_value: 65,
        },
        10: {
            HLT: 2150,
            atkDef: 575,
            apValues: 950,
            enhancement_value: 21,
            enhancer_value: 70,
        },
    };
    
    function setTierDefaults(type, value) {
        if (type === "TIER" && tierConfig[value]) {
            let atk_stat = tierConfig[value].atkDef;
            let attack;
            let defense;
            let move_numbers = tierConfig[value].apValues;
            let move1 = Math.round(move_numbers * 0.15);
            let move2 = Math.round(move_numbers * 0.35);
            let move3 = Math.round(move_numbers * 0.50);
            
            if (combatStyle.COMBAT_STYLE === "OFFENSIVE") {
                attack = Math.round(atk_stat * 0.70);
                defense = Math.round(atk_stat * 0.30);
            } else if (combatStyle.COMBAT_STYLE === "DEFENSIVE") {
                defense = Math.round(atk_stat * 0.70);
                attack = Math.round(atk_stat * 0.30);
            } else if (combatStyle.COMBAT_STYLE === "BALANCED") {
                defense = Math.round(atk_stat * 0.50);
                attack = Math.round(atk_stat * 0.50);
            }

            setData({
                ...data,
                TIER: value,
                HLT: tierConfig[value].HLT,
                ATK: attack,
                DEF: defense,
            });

            setMoves({
                ...moves,
                MOVE1_POWER: move1,
                MOVE2_POWER: move2,
                MOVE3_POWER: move3,
                ENHANCER_POWER: tierConfig[value].enhancer_value,
            })
            
            setDefaults({
                ...defaults,
                atkDef: tierConfig[value].atkDef,
                apValues: tierConfig[value].apValues,
                ad_points_left: tierConfig[value].atkDef - (ATK + DEF),
                ap_points_left: tierConfig[value].apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER),
            });

        }
    }

    const onChangeHandler = (e) => {
        setShow(false);
    
        const { type, name, value, valueAsNumber, id } = e.target;
        
        // if (name === "NAME" && value.includes('\n')) {
        //     console.log("BATCH JOB");
        //     setBatchJob(true);
        // } else {
        //     setBatchJob(false);
        // }
        
        // For input of type number
        if (type === "number") {
            setData(prevData => ({
                ...prevData,
                [name]: valueAsNumber
            }));
            setTierDefaults(name, valueAsNumber);
            return;
        }
    
        // For the IS_SKIN field
        if (name === "IS_SKIN") {
            setData(prevData => ({
                ...prevData,
                IS_SKIN: Boolean(value)
            }));
            return;
        }

        // For the AVAILABLE field
        if (name === "AVAILABLE") {
            setData(prevData => ({
                ...prevData,
                AVAILABLE: Boolean(value)
            }));
            return;
        }
    
        // For other inputs
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const moveHandler = (e) => {
        if (e.target.type === "number"){
            setMoves({
                ...moves,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setMoves({
                ...moves,
                [e.target.name]: e.target.value
            })
        }
        
        move1Object[MOVE1_ABILITY] = MOVE1_POWER
        move1Object['STAM'] = 10
        move1Object['ELEMENT'] = MOVE1_ELEMENT
        
        move2Object[MOVE2_ABILITY] = MOVE2_POWER
        move2Object['STAM'] = 30
        move2Object['ELEMENT'] = MOVE2_ELEMENT

        
        move3Object[MOVE3_ABILITY] = MOVE3_POWER
        move3Object['STAM'] = 80
        move3Object['ELEMENT'] = MOVE3_ELEMENT
        

        enhancerObject[ENHANCER_ABILITY] = ENHANCER_POWER
        enhancerObject['STAM'] = 20
        enhancerObject['TYPE'] = ENHANCEMENT_TYPE
    }

    var classHandler = (e) => {
        let value = e[0]
        classes.map(c => {
            if (e.value === c) {
                setData({
                    ...data,
                    CLASS: c,
                })
            }
        })
    };


    var dropStyleHandler = (e) => {
        let value = e[0]
        drop_styles.map(drop => {
            if (e.value === drop) {
                setData({
                    ...data,
                    DROP_STYLE: drop,
                })
            }
        })
    };


    if(!universes.loading) {
        var universeSelector = universes.universe.map(universe => {
            return {
                value: universe.TITLE, label: `${universe.TITLE}`
            }
        })
    
        var universeHandler = (e) => {
            let value = e[0]
            universes.universe.map(universe => {
                if (e.value === universe.TITLE) {
                    setData({
                        ...data,
                        UNIVERSE: universe.TITLE,
                    })
                }
            })
        }
    };

    if(!cardData.loading) {
        var cardSelector = cardData.data.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })
    
        var skinForHandler = (e) => {
            let value = e[0]
            cardData.data.map(card => {
                if (e.value === card.NAME) {
                    // Passive Breakdown
                    setData({
                        ...data,
                        SKIN_FOR: card.NAME
                    })
                }
            })
        }
        
    };

    const onClickSelectImage = async (e) => {
        e.preventDefault()
        setSelectImageToggle(!selectImageToggle)
        const res = await axios.get(`/crown/cloudinary/${data.NAME}`)
        if(res){
            setImages({
                ...images,
                list_of_images: res.data,
                loading: false
            })
        }
    }


    const onClickSelectGif = async (e) => {
        e.preventDefault()
        setSelectGifToggle(!selectGifToggle)
        const res = await axios.get(`/crown/tenor/${data.NAME} ${data.UNIVERSE}`)
        console.log(res)
        if(res){
            setGifs({
                ...images,
                list_of_gifs: res.data,
                loading: false
            })
        }
    }

    
    if(!images.loading) {
        if(images.list_of_images.length > 0){
                var images_selector = images.list_of_images.map(image => {
                    return {
                        value: image.url, label: `${image.filename}`
                    }
                }
            )
        }


        var baseImageHandler = (e) => {
            let value = e[0]
            images.list_of_images.map(image => {
                if (e.value === image.url) {
                    setData({
                        ...data,
                        PATH: image.url,
                    })
                }
            })
        };

        var focusImageHandler = (e) => {
            let value = e[0]
            images.list_of_images.map(image => {
                if (e.value === image.url) {
                    setData({
                        ...data,
                        FPATH: image.url,
                    })
                }
            })
        };

        var resolveImageHandler = (e) => {
            let value = e[0]
            images.list_of_images.map(image => {
                if (e.value === image.url) {
                    setData({
                        ...data,
                        RPATH: image.url,
                    })
                }
            })
        };
    }

    if(!gifs.loading) {
        if(gifs.list_of_gifs.length > 0){
                var gifs_selector = gifs.list_of_gifs.map(gif => {
                    return {
                        value: gif, label: `${gif}`
                    }
                }
            )
        }

        var gifHandler = (e) => {
            let value = e[0]
            gifs.list_of_gifs.map(gif => {
                if (e.value === gif) {
                    setData({
                        ...data,
                        GIF: gif,
                    })
                }
            })
        };
    }




    const onClickAi = async (e) => {
        try {
            setAiToggleLoading(true)
            const res = await axios.get(`/crown/ai/prompt/${data.NAME}/${data.UNIVERSE}`)
            const additional_abilities = await axios.get(`/crown/ai/prompt/abilities/${data.NAME}/${data.UNIVERSE}`)
            console.log(additional_abilities)
            if(additional_abilities){
                setAdditionals({
                    ...additionals,
                    data: additional_abilities.data
                })
            }
            if(res){
                const min = 1000000; // Minimum 7-digit number (inclusive)
                const max = 9999999; // Maximum 7-digit number (inclusive)
                const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

                let combat_style = res.data.combat_style;
                let atk_stat = tierConfig[parseInt(res.data.tier, 10)].atkDef;
                let attack;
                let defense;
                let move_numbers = tierConfig[parseInt(res.data.tier, 10)].apValues;
                let move1 = Math.round(move_numbers * 0.15);
                let move2 = Math.round(move_numbers * 0.35);
                let move3 = Math.round(move_numbers * 0.50);
                
                if (combat_style === "OFFENSIVE") {
                    attack = Math.round(atk_stat * 0.70);
                    defense = Math.round(atk_stat * 0.30);
                } else if (combat_style === "DEFENSIVE") {
                    defense = Math.round(atk_stat * 0.70);
                    attack = Math.round(atk_stat * 0.30);
                } else if (combat_style === "BALANCED") {
                    defense = Math.round(atk_stat * 0.50);
                    attack = Math.round(atk_stat * 0.50);
                }

                setCombatStyle({
                    ...combatStyle,
                    COMBAT_STYLE: combat_style
                })

                setData({
                    ...data,
                    CLASS: res.data.card_class.toUpperCase(),
                    TIER: parseInt(res.data.tier, 10),
                    HLT: tierConfig[parseInt(res.data.tier, 10)].HLT,
                    ATK: attack,
                    DEF: defense,
                    SPD: parseInt(res.data.speed, 10),
                    WEAKNESS: res.data.weaknesses,
                    RESISTANT: res.data.resistances,
                    REPEL: res.data.repels,
                    IMMUNE: res.data.immunity,
                    ABSORB: res.data.absorbs,
                    ID: randomCode.toString()
                })

                if(parseInt(res.data.tier, 10) > 0){
                    setDefaults({
                        ...defaults,
                        atkDef: tierConfig[parseInt(res.data.tier, 10)].atkDef,
                        apValues: tierConfig[parseInt(res.data.tier, 10)].apValues,
                        ad_points_left: tierConfig[parseInt(res.data.tier, 10)].atkDef - (ATK + DEF),
                        ap_points_left: tierConfig[parseInt(res.data.tier, 10)].apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)
                    });
        
                }

                setMoves({
                    ...moves,
                    MOVE1_ABILITY: res.data.normal_attack_name,
                    MOVE1_POWER: move1,
                    MOVE1_ELEMENT: res.data.normal_attack_element.toUpperCase(),
                    MOVE2_ABILITY: res.data.special_attack_name,
                    MOVE2_POWER: move2,
                    MOVE2_ELEMENT: res.data.special_attack_element.toUpperCase(),
                    MOVE3_ABILITY: res.data.ultimate_attack_name,
                    MOVE3_POWER: move3,
                    MOVE3_ELEMENT: res.data.ultimate_attack_element.toUpperCase(),
                    ENHANCER_ABILITY: res.data.enhancement_ability_name,
                    ENHANCEMENT_TYPE: res.data.enhancement_ability_type.toUpperCase(),
                    ENHANCER_POWER: tierConfig[parseInt(res.data.tier, 10)].enhancement_value,
                })

                setAiToggle(true)
                setAiToggleLoading(false)
            } else {
                setAiToggleFailure(true)
                // Set 5 second timeout until it auto flips back to false
                setTimeout(() => {
                    setAiToggleFailure(false)
                }
                , 5000)
            }
        } catch (err) {
            setAiToggleLoading(false)
            console.error(err)
        }
    }


    const batchCardGeneration = async (cardname, universename) => {
        console.log(`BATCH JOB STARTED - ${cardname}`)
        const res = await axios.get(`/crown/ai/prompt/${cardname}/${universename}`)
        console.log(res)
        if(res){
            const min = 1000000; // Minimum 7-digit number (inclusive)
            const max = 9999999; // Maximum 7-digit number (inclusive)
            const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

            let combat_style = res.data.combat_style;
            let atk_stat = tierConfig[parseInt(res.data.tier, 10)].atkDef;
            let attack;
            let defense;
            let move_numbers = tierConfig[parseInt(res.data.tier, 10)].apValues;
            let move1 = Math.round(move_numbers * 0.15);
            let move2 = Math.round(move_numbers * 0.35);
            let move3 = Math.round(move_numbers * 0.50);
            
            if (combat_style === "OFFENSIVE") {
                attack = Math.round(atk_stat * 0.70);
                defense = Math.round(atk_stat * 0.30);
            } else if (combat_style === "DEFENSIVE") {
                defense = Math.round(atk_stat * 0.70);
                attack = Math.round(atk_stat * 0.30);
            } else if (combat_style === "BALANCED") {
                defense = Math.round(atk_stat * 0.50);
                attack = Math.round(atk_stat * 0.50);
            }

            setCombatStyle({
                ...combatStyle,
                COMBAT_STYLE: combat_style
            })

            setData({
                ...data,
                NAME: cardname,
                UNIVERSE: universename,
                CLASS: res.data.card_class.toUpperCase(),
                TIER: parseInt(res.data.tier, 10),
                HLT: tierConfig[parseInt(res.data.tier, 10)].HLT,
                ATK: attack,
                DEF: defense,
                SPD: parseInt(res.data.speed, 10),
                WEAKNESS: res.data.weaknesses,
                RESISTANT: res.data.resistances,
                REPEL: res.data.repels,
                IMMUNE: res.data.immunity,
                ABSORB: res.data.absorbs,
                ID: randomCode.toString()
            })

            setMoves({
                ...moves,
                MOVE1_ABILITY: res.data.normal_attack_name,
                MOVE1_POWER: move1,
                MOVE1_ELEMENT: res.data.normal_attack_element.toUpperCase(),
                MOVE2_ABILITY: res.data.special_attack_name,
                MOVE2_POWER: move2,
                MOVE2_ELEMENT: res.data.special_attack_element.toUpperCase(),
                MOVE3_ABILITY: res.data.ultimate_attack_name,
                MOVE3_POWER: move3,
                MOVE3_ELEMENT: res.data.ultimate_attack_element.toUpperCase(),
                ENHANCER_ABILITY: res.data.enhancement_ability_name,
                ENHANCEMENT_TYPE: res.data.enhancement_ability_type.toUpperCase(),
                ENHANCER_POWER: tierConfig[parseInt(res.data.tier, 10)].enhancement_value,
            })

            console.log(data)
            setData({
                ...data,
                MOVESET: [move1Object, move2Object, move3Object, enhancerObject]
            })

            var card_update_data = data;
            card_update_data.MOVESET = [move1Object, move2Object, move3Object, enhancerObject]

            // console.log(card_update_data)

            const saveRes = await saveCard(data)

            // setData(cardInitialState)
            return true
        } else {
            return false
        }
    }

    const runBatchJob = async () => {
        setAiToggleLoading(true)
        var card_names = data.NAME.split(/\r?\n/);
        var card_universe = data.UNIVERSE.split('\n')
        var success = 0
        var fails = 0
        var fail_names = []
        for(var i = 0; i < card_names.length; i++){
            var response = await batchCardGeneration(card_names[i], card_universe[i])
            if(response){
                success += 1
            } else {
                fails += 1
                fail_names.push(card_names[i])
            }
        }
        setAiToggleLoading(false)
        if(fails > 0){
            alert(`Batch Job Complete! ${success} cards were successfully generated. ${fails} cards failed to generate. The following cards failed to generate: ${fail_names}`)
        } else {
            alert(`Batch Job Complete! ${success} cards were successfully generated.`)
        }   
    }

    const skipGenerationClick = (e) => {
        e.preventDefault()
        setAiToggle(true)
    }


    var enhancementSelector = enhancements.map(enhancement => {
        return {
            value: enhancement, label: `${enhancement}`
        }
    });

    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    });

    var classSelector = classes.map(classType => {
        return {
            value: classType, label: `${classType}`
        }
    });

    var dropStyleSelector = drop_styles.map(drop => {
        return {
            value: drop, label: `${drop}`
        }
    });

    var moveEnhancementHandler = (e) => {
        let value = e[0]
        enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setMoves({
                    ...moves,
                    ENHANCEMENT_TYPE: enhancement,
                })
            }
        })
    };

    const enhanceElementHandler = (e, moveType) => {
        if (elements.includes(e.value)) {
            setMoves({
                ...moves,
                [moveType]: e.value
            });
        }
    };
    const element1EnhancementHandler = (e) => enhanceElementHandler(e, 'MOVE1_ELEMENT');
    const element2EnhancementHandler = (e) => enhanceElementHandler(e, 'MOVE2_ELEMENT');
    const element3EnhancementHandler = (e) => enhanceElementHandler(e, 'MOVE3_ELEMENT');
    
    const genericHandler = (selectedOptions, property) => {
        if (selectedOptions) {
            const newList = selectedOptions.map((option) => option.value);
            setData({
                ...data,
                [property]: newList
            });   
        } else {
            setData({
                ...data,
                [property]: []
            });
        }
    };
    
    const weaknessHandler = (e) => genericHandler(e, 'WEAKNESS');
    const resistancesHandler = (e) => genericHandler(e, 'RESISTANT');
    const repelsHandler = (e) => genericHandler(e, 'REPEL');
    const immunityHandler = (e) => genericHandler(e, 'IMMUNE');
    const absorbHandler = (e) => genericHandler(e, 'ABSORB');
    

    var submission_response = "Success!";
    var submission_alert_dom = <Alert show={show} variant="success"> {submission_response} </Alert>
    const onSubmitHandler = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setShow(false)
            setValidated(true);
        } else {
            setValidated(false)
            e.preventDefault();

            setData({
                ...data,
                MOVESET: [move1Object, move2Object, move3Object, enhancerObject]
            })

            var card_update_data = data;
            card_update_data.MOVESET = [move1Object, move2Object, move3Object, enhancerObject]

            const res = await saveCard(data)

            setData(cardInitialState)
            setAiToggle(false)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    };
    

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };
    return auth.loading || universes.loading || aiToggleLoading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        New Card
                    </h3>
                </div>
                
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label><h4>Select Universe</h4></Form.Label>
                                            <Select
                                                onChange={universeHandler}
                                                options={
                                                    universeSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="10" controlId="validationCustom02">
                                            <Form.Label>Character Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={NAME}
                                                name="NAME"
                                                onChange={onChangeHandler}
                                                required
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button
                                        style={{ display: !aiToggle ? 'block' : 'none' }}
                                        variant={aiToggleFailure ? 'danger' : 'primary'}
                                        type="button"
                                        onClick={onClickAi}
                                    >
                                        {aiToggleFailure ? 'Generation Failed, please click here to try again' : 'Generate Card Data'}
                                    </Button>
                                    <br style={{ display: !aiToggle ? 'block' : 'none' }} />
                                    <Button
                                        style={{ display: !aiToggle ? 'block' : 'none' }}
                                        variant="warning"
                                        type="button"
                                        onClick={skipGenerationClick}
                                    >
                                        Skip AI Generation
                                    </Button>
                                    {/* <br style={{ display: !aiToggle ? 'block' : 'none' }} />
                                    <Button
                                        style={{ display: batchJob ? 'block' : 'none' }}
                                        variant="primary"
                                        type="button"
                                        onClick={runBatchJob}
                                    >
                                        Start Batch Generation Job
                                    </Button> */}


                                    <br style={{ display: !aiToggle ? 'block' : 'none' }} />
                                    {auth.user.data.IS_ADMIN ? 
                                    <Link to="/updatecards"><Button variant="warning" style={{ display: !aiToggle ? 'block' : 'none' }}>Update Cards</Button></Link> 
                                    : <span></span>
                                    }
                                    <br style={{ display: !aiToggle ? 'block' : 'none' }} />
                                    
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ display: aiToggle ? 'block' : 'none' }}>
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <Button
                                style={{ display: !insertImageToggle ? 'block' : 'none' }}
                                variant="primary"
                                type="button"
                                onClick={onClickSelectImage}
                            >
                                {selectImageToggle ? 'Hide Image Selector' : 'Show Image Selector'}
                            </Button>
                            <br />
                            <Button
                                style={{ display: !selectImageToggle ? 'block' : 'none' }}
                                variant="primary"
                                type="button"
                                onClick={() => setInsertImageToggle(!insertImageToggle)}
                            >
                                {insertImageToggle ? 'Hide Insert Image Url Form' : 'Show Insert Image Url Form'}
                            </Button>
                            <br />
                            <div className="card-body" style={{ display: selectImageToggle ? 'block' : 'none' }}>
                                <Form>
                                    <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Base Image Path</Form.Label>
                                        <Select
                                            onChange={baseImageHandler}
                                            options={
                                                images_selector
                                            }
                                            required
                                            styles={styleSheet}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Focused Image Path</Form.Label>
                                        <Select
                                            onChange={focusImageHandler}
                                            options={
                                                images_selector
                                            }
                                            required
                                            styles={styleSheet}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Resolved Image Path</Form.Label>
                                        <Select
                                            onChange={resolveImageHandler}
                                            options={
                                                images_selector
                                            }
                                            required
                                            styles={styleSheet}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Form>
                                {data.PATH ? <img src={data.PATH} alt='Base Image' style={{ width: '50%', height: '50%' }} /> : <span>No Base Image</span>}
                                {data.FPATH ? <img src={data.FPATH} alt='Focus Image' style={{ width: '50%', height: '50%' }} /> : <span>No Focus Image</span>}
                                {data.RPATH ? <img src={data.RPATH} alt='Resolve Image' style={{ width: '50%', height: '50%' }} /> : <span>No Resolve Image</span>}
                            </div>
                            
                            <div className="card-body" style={{ display: insertImageToggle ? 'block' : 'none' }}>
                                <Form>
                                    <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Base Image Path</Form.Label>
                                        <Form.Control
                                            value={PATH}
                                            onChange={onChangeHandler}
                                            name="PATH"
                                            required
                                            type="text"

                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Focused Image Path</Form.Label>
                                        <Form.Control
                                            value={FPATH}
                                            name="FPATH"
                                            onChange={onChangeHandler}
                                            required
                                            type="text"

                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Resolved Image Path</Form.Label>
                                        <Form.Control
                                            value={RPATH}
                                            name="RPATH"
                                            onChange={onChangeHandler}
                                            required
                                            type="text"

                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Form>
                                {data.PATH ? <img src={data.PATH} alt='Base Image' style={{ width: '50%', height: '50%' }} /> : <span>No Base Image</span>}
                                {data.FPATH ? <img src={data.FPATH} alt='Focus Image' style={{ width: '50%', height: '50%' }} /> : <span>No Focus Image</span>}
                                {data.RPATH ? <img src={data.RPATH} alt='Resolve Image' style={{ width: '50%', height: '50%' }} /> : <span>No Resolve Image</span>}

                            </div>
                            <br />
                        </div>
                    </div>
                </div>

                <div className="row" style={{ display: aiToggle ? 'block' : 'none' }}>
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <Button
                                style={{ display: !insertGifToggle ? 'block' : 'none' }}
                                variant="danger"
                                type="button"
                                onClick={onClickSelectGif}
                            >
                                {selectGifToggle ? 'Hide Gif Selector' : 'Show Gif Selector'}
                            </Button>
                            <br />
                            <Button
                                style={{ display: !selectGifToggle ? 'block' : 'none' }}
                                variant="danger"
                                type="button"
                                onClick={() => setInsertGifToggle(!insertGifToggle)}
                            >
                                {insertGifToggle ? 'Hide Insert Gif Url Form' : 'Show Insert Gif Url Form'}
                            </Button>
                            <br />
                            <div className="card-body" style={{ display: selectGifToggle ? 'block' : 'none' }}>
                                <Form>
                                    <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Ultimate Gif</Form.Label>
                                        <Select
                                            onChange={gifHandler}
                                            options={
                                                gifs_selector
                                            }
                                            required
                                            styles={styleSheet}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Form>
                                {data.GIF ? <img src={data.GIF} alt='Base Image'/> : <span>No Ultimate Gif</span>}
                            </div>
                            
                            <div className="card-body" style={{ display: insertGifToggle ? 'block' : 'none' }}>
                                <Form>
                                    <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Ultimate Gif</Form.Label>
                                        <Form.Control
                                            value={GIF}
                                            onChange={onChangeHandler}
                                            name="GIF"
                                            required
                                            type="text"

                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Form>
                                {data.GIF ? <img src={data.GIF} alt='Base Image'/> : <span>No Ultimate Gif</span>}
                            </div>
                            <br />
                        </div>
                    </div>
                </div>

                <div className="row" style={{ display: aiToggle ? 'block' : 'none' }}>
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Card Class - {CLASS}</Form.Label>
                                            <Select
                                                onChange={classHandler}
                                                options={
                                                    classSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>


                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Tier</Form.Label>
                                            <Form.Control
                                                value={TIER}
                                                name="TIER"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Health</Form.Label>
                                            <Form.Control
                                                value={HLT}
                                                name="HLT"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Attack</Form.Label>
                                            <Form.Control
                                                value={ATK}
                                                name="ATK"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Defense</Form.Label>
                                            <Form.Control
                                                value={DEF}
                                                name="DEF"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Speed</Form.Label>
                                            <Form.Control
                                                value={SPD}
                                                name="SPD"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Drop Style</Form.Label>
                                            <Select
                                                onChange={dropStyleHandler}
                                                options={
                                                    dropStyleSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <p>Total Available Attack / Defense Point Left = {defaults.atkDef - (ATK + DEF)}</p>
                                    <p>Total Available Ability Points Left = {defaults.apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)}</p>
                                    <Button
                                        variant='primary'
                                        type="button"
                                        // If additionalAbilityToggle is false, make it true. Else, make it false.
                                        onClick={() => setAdditionalAbilityToggle(!additionalAbilityToggle)}
                                    >
                                    {additionalAbilityToggle ? 'Hide Profile View' : 'Show Character Profile'}
                                    </Button>
                                   

                                    <div style={{ display: additionalAbilityToggle ? 'block' : 'none' }}>
                                        <CardAbilities response={additionals.data} />
                                    </div>
                                    <br />
                                    
                                    {/* <div>
                                        <h2>Potential Abilities List</h2>
                                        <ol>
                                            <li>
                                                {moveOptions.POTENTIAL_MOVE1} - {moveOptions.POTENTIAL_MOVE1_ELEMENT} - {moveOptions.POTENTIAL_MOVE1_POWER}
                                            </li>
                                            <li>
                                                {moveOptions.POTENTIAL_MOVE2} - {moveOptions.POTENTIAL_MOVE2_ELEMENT} - {moveOptions.POTENTIAL_MOVE2_POWER}
                                            </li>
                                            <li>
                                                {moveOptions.POTENTIAL_MOVE3} - {moveOptions.POTENTIAL_MOVE3_ELEMENT} - {moveOptions.POTENTIAL_MOVE3_POWER}
                                            </li>
                                            <li>
                                                {moveOptions.POTENTIAL_MOVE4} - {moveOptions.POTENTIAL_MOVE4_ELEMENT} - {moveOptions.POTENTIAL_MOVE4_POWER}
                                            </li>
                                            <li>
                                                {moveOptions.POTENTIAL_MOVE5} - {moveOptions.POTENTIAL_MOVE5_ELEMENT} - {moveOptions.POTENTIAL_MOVE5_POWER}
                                            </li>
                                        </ol>
                                    </div> */}

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Normal Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE1_ABILITY}
                                                    name="MOVE1_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE1_POWER}
                                                name="MOVE1_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element - {MOVE1_ELEMENT}</Form.Label>
                                            <Select
                                                onChange={element1EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Special Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE2_ABILITY}
                                                    name="MOVE2_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE2_POWER}
                                                name="MOVE2_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element - {MOVE2_ELEMENT}</Form.Label>
                                            <Select
                                                onChange={element2EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>


                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Ultimate Attack</Form.Label>
                                                <Form.Control
                                                    value={MOVE3_ABILITY}
                                                    name="MOVE3_ABILITY"
                                                    onChange={moveHandler}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={MOVE3_POWER}
                                                name="MOVE3_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element - {MOVE3_ELEMENT}</Form.Label>
                                            <Select
                                                onChange={element3EnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="8" controlId="validationCustom02">
                                            <Form.Label>Enhancement</Form.Label>
                                            <Form.Control
                                                value={ENHANCER_ABILITY}
                                                name="ENHANCER_ABILITY"
                                                onChange={moveHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Enhancement Type - {ENHANCEMENT_TYPE}</Form.Label>
                                            <Select
                                                onChange={moveEnhancementHandler}
                                                options={
                                                    enhancementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={ENHANCER_POWER}
                                                name="ENHANCER_POWER"
                                                onChange={moveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                        <Form.Label> Available </Form.Label>
                                        
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={onChangeHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                        <Form.Label> Is Skin? </Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={onChangeHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Skin for?</Form.Label>
                                            <Select
                                                onChange={skinForHandler}
                                                options={
                                                    cardSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Weaknesses - {data.WEAKNESS.join(", ")}</Form.Label>
                                            <Select
                                                onChange={weaknessHandler}
                                                value={WEAKNESS.map(weakness => ({value: weakness, label: weakness}))}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Resistances - {data.RESISTANT.join(", ")}</Form.Label>
                                            <Select
                                                onChange={resistancesHandler}
                                                value={RESISTANT.map(resistance => ({value: resistance, label: resistance}))}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Repels - {data.REPEL.join(", ")}</Form.Label>
                                            <Select
                                                onChange={repelsHandler}
                                                value={REPEL.map(repel => ({value: repel, label: repel}))}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Immunity - {data.IMMUNE.join(", ")}</Form.Label>
                                            <Select
                                                onChange={immunityHandler}
                                                value={IMMUNE.map(immunity => ({value: immunity, label: immunity}))}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Absorbs - {data.ABSORB.join(", ")}</Form.Label>
                                            <Select
                                                onChange={absorbHandler}
                                                value={ABSORB.map(absorb => ({value: absorb, label: absorb}))}
                                                isMulti
                                                options={elementSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Button type="submit">Create Card</Button>
                                    
                                    <br />
                                    <br />
                                    {auth.user.data.IS_ADMIN ? 
                                    <Link to="/updatecards"><Button variant="warning">Update Cards</Button></Link> 
                                    : <span></span>
                                    }
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                    
                                    
                                </Form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        
        )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cards: state.cards
})

export default connect(mapStateToProps, {saveCard})(NewCard)

