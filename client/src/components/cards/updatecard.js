import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { cardInitialState, enhancements, elements, classes, drop_styles } from '../STATE';
import { updateCard, deleteCard } from '../../actions/cards';
import _ from 'lodash';

export const UpdateCard = ({auth, cards, history, updateCard, deleteCard}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });
    const [cardData, setCardData] = useState({
        loading: true
    });
    const [defaults, setDefaults] = useState({
        apValues: 0,
        atkDef: 0
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
    const [gifs, setGifs] = useState({
        loading: true,
        gifs_available: false,
        list_of_gifs: []
    })
    const [selectGifToggle, setSelectGifToggle] = useState(false);
    const [insertGifToggle, setInsertGifToggle] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [data, setData] = useState(cardInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [passive, setPassive] = useState({
        ABILITY: "",
        POWER: 20,
        PASSIVE_TYPE: ""
    });
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
    var potentialPowerValues = 0
    // Build Moves
    var move1Object = {}
    var move2Object = {}
    var move3Object = {}
    var enhancerObject = {}
    var movesArray = []
    // Build Passive
    var pass_ability = passive.ABILITY.toString()
    var pass_power = passive.POWER
    var pass_type = passive.PASSIVE_TYPE
    var pass_key = pass_ability
    var passive_Object = {}
    passive_Object[pass_key] = pass_power
    passive_Object["TYPE"] = pass_type

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
      }, [auth])

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
            let move_numbers = tierConfig[value].apValues;
            let move1 = Math.round(move_numbers * 0.15);
            let move2 = Math.round(move_numbers * 0.35);
            let move3 = Math.round(move_numbers * 0.50);

            setData({
                ...data,
                TIER: value,
                HLT: tierConfig[value].HLT
            });

            setPassive({
                ...passive,
                POWER: tierConfig[value].enhancement_value,
            })

            setMoves({
                ...moves,
                MOVE1_POWER: move1,
                MOVE2_POWER: move2,
                MOVE3_POWER: move3,
                ENHANCER_POWER: tierConfig[value].enhancer_value,
            })
            
            setDefaults({
                atkDef: tierConfig[value].atkDef,
                apValues: tierConfig[value].apValues
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
            setTierDefaults(name, valueAsNumber, data.TIER);
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
    }

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


    const onClickSelectGif = async (e) => {
        e.preventDefault()
        setSelectGifToggle(!selectGifToggle)
        const res = await axios.get(`/crown/tenor/${data.NAME} ${data.UNIVERSE} Action`)
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
    }

    var enhancementSelector = enhancements.map(enhancement => {
        return {
            value: enhancement, label: `${enhancement}`
        }
    })

    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    })

    
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
    }

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
    }

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
    }

    var dropStyleSelector = drop_styles.map(drop => {
        return {
            value: drop, label: `${drop}`
        }
    });

    var element1EnhancementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE1_ELEMENT: element,
                })
            }
        })
    }

    var element2EnhancementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE2_ELEMENT: element,
                })
            }
        })
    }

    var element3EnhancementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setMoves({
                    ...moves,
                    MOVE3_ELEMENT: element,
                })
            }
        })
    }


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

    
        var cardHandler = (e) => {
            let value = e[0]
            cardData.data.map(card => {
                if (e.value === card.NAME) {
                    // Passive Breakdown
                    var passive_ability = Object.keys(card.PASS[0])[0]
                    var passive_power = Object.values(card.PASS[0])[0]
                    var passive_enhancement = card.PASS[0]["TYPE"]
                    setPassive({
                        ...passive,
                        ABILITY: passive_ability,
                        POWER: passive_power,
                        PASSIVE_TYPE: passive_enhancement
                    })

                    // Build Passive
                    var pass_ability = passive.ABILITY.toString()
                    var pass_power = passive.POWER
                    var pass_type = passive.PASSIVE_TYPE
                    var pass_key = pass_ability
                    var passive_Object = {}
                    passive_Object[pass_key] = pass_power
                    passive_Object["TYPE"] = pass_type

                    // Moves Breakdown
                    var move1_abilit = Object.keys(card.MOVESET[0])[0]
                    var move1_powe =  Object.values(card.MOVESET[0])[0]
                    var move1_elem =  Object.values(card.MOVESET[0])[2]

                    var move2_abilit = Object.keys(card.MOVESET[1])[0]
                    var move2_powe = Object.values(card.MOVESET[1])[0]
                    var move2_elem =  Object.values(card.MOVESET[1])[2]

                    var move3_abilit = Object.keys(card.MOVESET[2])[0]
                    var move3_powe = Object.values(card.MOVESET[2])[0]
                    var move3_elem =  Object.values(card.MOVESET[2])[2]

                    var move_enhancer_abilit =  Object.keys(card.MOVESET[3])[0]
                    var move_enhancer_powe =  Object.values(card.MOVESET[3])[0]
                    var move_enhancer_typ =  Object.values(card.MOVESET[3])[2]

                    // setting old state? 
                    setMoves({
                        ...moves,
                        MOVE1_ABILITY: move1_abilit,
                        MOVE1_POWER: move1_powe,
                        MOVE1_ELEMENT: move1_elem,
                        MOVE2_ABILITY: move2_abilit,
                        MOVE2_POWER: move2_powe,
                        MOVE2_ELEMENT: move2_elem,
                        MOVE3_ABILITY: move3_abilit,
                        MOVE3_POWER: move3_powe,
                        MOVE3_ELEMENT: move3_elem,
                        ENHANCER_ABILITY: move_enhancer_abilit,
                        ENHANCER_POWER: move_enhancer_powe,
                        ENHANCEMENT_TYPE: move_enhancer_typ
                    })
                   
                    
                    // Build Moves
                    var move1Object = {}
                    var move2Object = {}
                    var move3Object = {}
                    var enhancerObject = {}
                    
                    move1Object[move1_abilit] = move1_powe
                    move1Object['STAM'] = 10
                    move1Object['ELEMENT'] = move1_elem
                    
                    move2Object[move2_abilit] = move2_powe
                    move2Object['STAM'] = 30
                    move2Object['ELEMENT'] = move2_elem
                    
                    move3Object[move3_abilit] = move3_powe
                    move3Object['STAM'] = 80
                    move3Object['ELEMENT'] = move3_elem
                    

                    enhancerObject[move_enhancer_abilit] = move_enhancer_powe
                    enhancerObject['STAM'] = 20
                    enhancerObject['TYPE'] = move_enhancer_typ

                    var movesArray = []
                    movesArray.push(move1Object, move2Object, move3Object, enhancerObject)
                    setData({
                        ...data,
                        PATH: card.PATH,
                        FPATH: card.FPATH,
                        RPATH: card.RPATH,
                        GIF: card.GIF,
                        NAME: card.NAME,
                        RNAME: card.RNAME,
                        PRICE: card.PRICE,
                        HLT: card.HLT,
                        STAM: card.STAM,
                        ATK: card.ATK,
                        DEF: card.DEF,
                        TYPE: card.TYPE,
                        TIER: card.TIER,
                        SPD: card.SPD,
                        VUL: card.VUL,
                        PASS: [passive_Object],
                        MOVESET: movesArray,
                        UNIVERSE: card.UNIVERSE,
                        AVAILABLE: card.AVAILABLE,
                        DESCRIPTIONS: card.DESCRIPTIONS,
                        IS_SKIN: card.IS_SKIN,
                        SKIN_FOR: card.SKIN_FOR,
                        REPEL: card.REPEL,
                        RESISTANT: card.RESISTANT,
                        ABSORB: card.ABSORB,
                        IMMUNE: card.IMMUNE,
                        WEAKNESS: card.WEAKNESS,
                        CLASS: card.CLASS,
                        DROP_STYLE: card.DROP_STYLE,
                        ID: card.ID
                    })
                }
            })
        }
    }

    var classSelector = classes.map(c => {
        return {
            value: c, label: `${c}`
        }
    })
    

    var weaknessHandler = (e) => {
        if(e != null){
            let value = e
            const weaknessList = [];
            for(const ti of value){
                if(!data.WEAKNESS.includes(ti)){
                    weaknessList.push(ti.value)
                }
            }
            if(weaknessList){
                setData({
                    ...data,
                    WEAKNESS: weaknessList,
                })
            }
            
        }
    }
    var resistancesHandler = (e) => {
        if(e != null){
            let value = e
            const resistancesList = [];
            for(const ti of value){
                if(!data.RESISTANT.includes(ti)){
                    resistancesList.push(ti.value)
                }
            }
            if(resistancesList){
                setData({
                    ...data,
                    RESISTANT: resistancesList,
                })
            }
            
        }
    }
    var repelsHandler = (e) => {
        if(e != null){
            let value = e
            const repelsList = [];
            for(const ti of value){
                if(!data.REPEL.includes(ti)){
                    repelsList.push(ti.value)
                }
            }
            if(repelsList){
                setData({
                    ...data,
                    REPEL: repelsList,
                })
            }
            
        }
    }
    var immunityHandler = (e) => {
        if(e != null){
            let value = e
            const immunityList = [];
            for(const ti of value){
                if(!data.IMMUNE.includes(ti)){
                    immunityList.push(ti.value)
                }
            }
            if(immunityList){
                setData({
                    ...data,
                    IMMUNE: immunityList,
                })
            }
            
        }
    }
    var absorbHandler = (e) => {
        if(e != null){
            let value = e
            const absorbList = [];
            for(const ti of value){
                if(!data.ABSORB.includes(ti)){
                    absorbList.push(ti.value)
                }
            }
            if(absorbList){
                setData({
                    ...data,
                    ABSORB: absorbList,
                })
            }
            
        }
    }


    
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
            
            console.log(card_update_data)
            const res = await updateCard(card_update_data)
            setData(cardInitialState)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const name = data.NAME
        const res = await deleteCard(data);
        setModalShow(false);
    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    return auth.loading || cardData.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Update Cards
                    </h3>
                </div>

                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label><h3>Select Card</h3></Form.Label>
                                            <Select
                                                onChange={cardHandler}
                                                options={
                                                    cardSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        
                                    </Form.Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{ display: data.NAME ? 'block' : 'none' }}>
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

                <div className="row" style={{ display: data.GIF ? 'block' : 'none' }}>
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


                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="3" controlId="validationCustom02">
                                        <Form.Label>Card Class</Form.Label>
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

                                        <Form.Group as={Col} md="6" controlId="validationCustom05">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                value={NAME}
                                                name="NAME"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                    <Form.Group as={Col} md="2" controlId="validationCustom07">
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom09">
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom10">
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

                                        <Form.Group as={Col} md="1" controlId="validationCustom11">
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom12">
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
                                        <Form.Group as={Col} md="6" controlId="validationCustom13">
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
                                        <Form.Group as={Col} md="3" controlId="validationCustom14">
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

                                        <Form.Group as={Col} md="3" controlId="validationCustom15">
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
                                            <Form.Label>Drop Style - {DROP_STYLE}</Form.Label>
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
                                    <p>Total Available Ability Point Left = {defaults.apValues -(MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)}</p>
                                    <Form.Row>
                                        
                                        <Form.Group as={Col} md="6" controlId="validationCustom18">
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
                                        <Form.Group as={Col} md="2" controlId="validationCustom19">
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


                                        <Form.Group as={Col} md="6" controlId="validationCustom20">
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
                                        <Form.Group as={Col} md="2" controlId="validationCustom21">
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

                                        <Form.Group as={Col} md="6" controlId="validationCustom22">
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
                                        <Form.Group as={Col} md="2" controlId="validationCustom23">
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

                                        <Form.Group as={Col} md="8" controlId="validationCustom24">
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
                                        <Form.Group as={Col} md="3" controlId="validationCustom25">
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
                                        <Form.Group as={Col} md="1" controlId="validationCustom26">
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
                                        <Form.Group as={Col} md="2" controlId="validationCustom27">
                                            <Form.Label>Available</Form.Label>
                                            
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
                                            <Form.Label>Is Skin?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="inlineFormCustomSelectPref"
                                                onChange={onChangeHandler}
                                            >
                                                <option value={true} name="true">Yes</option>
                                                <option value={""} name="false">No</option>
                                            </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                            <Form.Label>Weaknesses - {WEAKNESS.join(", ")}</Form.Label>
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
                                            <Form.Label>Resistances - {RESISTANT.join(", ")}</Form.Label>
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
                                            <Form.Label>Repels - {REPEL.join(", ")}</Form.Label>
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
                                            <Form.Label>Immunity - {IMMUNE.join(", ")}</Form.Label>
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
                                            <Form.Label>Absorbs - {ABSORB.join(", ")}</Form.Label>
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

                                    <Button type="submit">Update Card</Button>
                                    <br />
                                    <br />
                                    <Link to="/newcard"><Button as={Col} md="2" variant="outline-warning">New Card</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                    
                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this card?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Card
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Form>

                            </div>

                            {/* <Alerts /> */}
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

export default connect(mapStateToProps, {updateCard, deleteCard})(UpdateCard)
