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
    const [selectImageToggle, setSelectImageToggle] = useState(false);
    const [insertImageToggle, setInsertImageToggle] = useState(false);
    const [aiToggle, setAiToggle] = useState(false);
    const [aiToggleLoading, setAiToggleLoading] = useState(false);
    const [aiToggleFailure, setAiToggleFailure] = useState(false);
    const [data, setData] = useState(cardInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [passive, setPassive] = useState({
        ABILITY: "",
        POWER: 20,
        PASSIVE_TYPE: ""
    });
    // Build Passive
    var pass_ability = passive.ABILITY.toString()
    var pass_power = passive.POWER
    var pass_type = passive.PASSIVE_TYPE
    var pass_key = pass_ability
    var passive_Object = {}
    passive_Object[pass_key] = pass_power
    passive_Object["TYPE"] = pass_type

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

      }, [data, passive, moves, auth])


    const tierConfig = { 
        1: {
            HLT: 1725,
            atkDef: 325,
            apValues: 500
        },
        2: {
            HLT: 1750,
            atkDef: 350,
            apValues: 550
        },
        3: {
            HLT: 1800,
            atkDef: 400,
            apValues: 600
        },
        4: {
            HLT: 1850,
            atkDef: 425,
            apValues: 650
        },
        5: {
            HLT: 1900,
            atkDef: 450,
            apValues: 700
        },
        6: {
            HLT: 1950,
            atkDef: 475,
            apValues: 750
        },
        7: {
            HLT: 2000,
            atkDef: 500,
            apValues: 800
        },
        8: {
            HLT: 2050,
            atkDef: 525,
            apValues: 850
        },
        9: {
            HLT: 2100,
            atkDef: 550,
            apValues: 900
        },
        10: {
            HLT: 2150,
            atkDef: 575,
            apValues: 950
        },
    };
    
    function setTierDefaults(type, value) {
        if (type === "TIER" && tierConfig[value]) {
            setData({
                ...data,
                TIER: value,
                HLT: tierConfig[value].HLT
            });
            
            setDefaults({
                ...defaults,
                atkDef: tierConfig[value].atkDef,
                apValues: tierConfig[value].apValues,
                ad_points_left: tierConfig[value].atkDef - (ATK + DEF),
                ap_points_left: tierConfig[value].apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)
            });
        }
    }

    const onChangeHandler = (e) => {
        setShow(false);
    
        const { type, name, value, valueAsNumber, id } = e.target;
    
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


    const passiveHandler = (e) => {
        if (e.target.type === "number"){
            setPassive({
                ...passive,
                [e.target.name]: e.target.valueAsNumber
            })
        } else {
            setPassive({
                ...passive,
                [e.target.name]: e.target.value
            })
        }
    }

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
        console.log(res.data)
        if(res){
            setImages({
                ...images,
                list_of_images: res.data,
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


    const onClickAi = async (e) => {
        try {
            setAiToggleLoading(true)
            // e.preventDefault()
            const res = await axios.get(`/crown/ai/prompt/${data.NAME}/${data.UNIVERSE}`)
            if(res){
                const min = 1000000; // Minimum 7-digit number (inclusive)
                const max = 9999999; // Maximum 7-digit number (inclusive)
                const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

                setData({
                    ...data,
                    CLASS: res.data.card_class,
                    TIER: parseInt(res.data.tier, 10),
                    HLT: parseInt(res.data.health, 10),
                    ATK: parseInt(res.data.attack, 10),
                    DEF: parseInt(res.data.defense, 10),
                    SPD: parseInt(res.data.speed, 10),
                    WEAKNESS: res.data.weaknesses,
                    RESISTANT: res.data.resistances,
                    REPEL: res.data.repels,
                    IMMUNE: res.data.immunity,
                    ABSORB: res.data.absorbs,
                    ID: randomCode.toString()
                })

                console.log(parseInt(res.data.tier, 10))
                console.log(tierConfig[parseInt(res.data.tier, 10)])
                if(parseInt(res.data.tier, 10) > 0){
                    setDefaults({
                        ...defaults,
                        atkDef: tierConfig[parseInt(res.data.tier, 10)].atkDef,
                        apValues: tierConfig[parseInt(res.data.tier, 10)].apValues,
                        ad_points_left: tierConfig[parseInt(res.data.tier, 10)].atkDef - (ATK + DEF),
                        ap_points_left: tierConfig[parseInt(res.data.tier, 10)].apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)
                    });
        
                }

                setPassive({
                    ...passive,
                    ABILITY: res.data.passive_ability_name,
                    PASSIVE_TYPE: res.data.passive_ability_type,
                })


                setMoves({
                    ...moves,
                    MOVE1_ABILITY: res.data.normal_attack_name,
                    MOVE1_POWER: parseInt(res.data.normal_attack_power),
                    MOVE1_ELEMENT: res.data.normal_attack_element.toUpperCase(),
                    MOVE2_ABILITY: res.data.special_attack_name,
                    MOVE2_POWER: parseInt(res.data.special_attack_power),
                    MOVE2_ELEMENT: res.data.special_attack_element.toUpperCase(),
                    MOVE3_ABILITY: res.data.ultimate_attack_name,
                    MOVE3_POWER: parseInt(res.data.ultimate_attack_power),
                    MOVE3_ELEMENT: res.data.ultimate_attack_element.toUpperCase(),
                    ENHANCER_ABILITY: res.data.enhancement_ability_name,
                    ENHANCEMENT_TYPE: res.data.enhancement_ability_type.toUpperCase(),
                })


                setMoveOptions({
                    ...moveOptions,
                    POTENTIAL_MOVE1: res.data.potential_ability1_name,
                    POTENTIAL_MOVE1_ELEMENT: res.data.potential_ability1_element.toUpperCase(),
                    POTENTIAL_MOVE1_POWER: res.data.potential_ability1_power,
                    POTENTIAL_MOVE2: res.data.potential_ability2_name,
                    POTENTIAL_MOVE2_ELEMENT: res.data.potential_ability2_element.toUpperCase(),
                    POTENTIAL_MOVE2_POWER: res.data.potential_ability2_power,
                    POTENTIAL_MOVE3: res.data.potential_ability3_name,
                    POTENTIAL_MOVE3_ELEMENT: res.data.potential_ability3_element.toUpperCase(),
                    POTENTIAL_MOVE3_POWER: res.data.potential_ability3_power,
                    POTENTIAL_MOVE4: res.data.potential_ability4_name,
                    POTENTIAL_MOVE4_ELEMENT: res.data.potential_ability4_element.toUpperCase(),
                    POTENTIAL_MOVE4_POWER: res.data.potential_ability4_power,
                    POTENTIAL_MOVE5: res.data.potential_ability5_name,
                    POTENTIAL_MOVE5_ELEMENT: res.data.potential_ability5_element.toUpperCase(),
                    POTENTIAL_MOVE5_POWER: res.data.potential_ability5_power,
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
            console.error(err)
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

    var passiveEnhancementHandler = (e) => {
        let value = e[0]
        enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setPassive({
                    ...passive,
                    PASSIVE_TYPE: enhancement,
                })
            }
        })

    };

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
    
    const genericHandler = (e, property) => {
        if (e !== null) {
            const list = [];
    
            for (const ti of e) {
                if (!data[property].includes(ti)) {
                    list.push(ti.value);
                }
            }
    
            if (list.length > 0) {
                setData({
                    ...data,
                    [property]: list
                });
            }
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
            card_update_data.PASS = [passive_Object]
            card_update_data.MOVESET = [move1Object, move2Object, move3Object, enhancerObject]

            const res = await saveCard(data)

            setData(cardInitialState)
            console.log(data)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    };
    console.log(data)
    

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
                                                value={NAME}
                                                name="NAME"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

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
                            </div>
                            <br />
                            {data.PATH ? <img src={data.PATH} alt='Base Image' style={{ width: '50%', height: '50%' }} /> : <span>No Base Image</span>}
                            {data.FPATH ? <img src={data.FPATH} alt='Focus Image' style={{ width: '50%', height: '50%' }} /> : <span>No Focus Image</span>}
                            {data.RPATH ? <img src={data.RPATH} alt='Resolve Image' style={{ width: '50%', height: '50%' }} /> : <span>No Resolve Image</span>}

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
                                            <Form.Label>Ultimate Ability GIF</Form.Label>
                                            <Form.Control
                                                value={GIF}
                                                name="GIF"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

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
                                            <Form.Label>Passive Ability</Form.Label>
                                            <Form.Control
                                                value={passive.ABILITY}
                                                name="ABILITY"
                                                onChange={passiveHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                            <Form.Label>Passive Power</Form.Label>
                                            <Form.Control
                                                value={passive.POWER}
                                                name="POWER"
                                                onChange={passiveHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Passive Type - {passive.PASSIVE_TYPE}</Form.Label>
                                            <Select
                                                onChange={passiveEnhancementHandler}
                                                options={
                                                    enhancementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

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
                                    
                                    <div>
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
                                    </div>
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

