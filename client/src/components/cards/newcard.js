import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { cardInitialState, enhancements, elements } from '../STATE'
import { saveCard } from '../../actions/cards'

export const NewCard = ({auth, cards, history, saveCard}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });

    const [desc, setDesc] = useState({
        DESC: [],
        TEXT: ""
    })

    const [cardData, setCardData] = useState({
        loading: true
    });
    const [defaults, setDefaults] = useState({
        apValues: 0,
        atkDef: 0
    })
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

    var potentialPowerValues = 0
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

    const {PATH, FPATH, RPATH, GIF, NAME, RNAME, PRICE, TOURNAMENT_REQUIREMENTS, MOVESET, HLT, STAM, ATK, DEF, TYPE, TIER, PASS, SPD, VUL, UNIVERSE, COLLECTION, HAS_COLLECTION, STOCK, AVAILABLE, DESCRIPTIONS, EXCLUSIVE, IS_SKIN, SKIN_FOR, WEAKNESS, RESISTANT, REPEL, IMMUNE, ABSORB} = data;
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
      }, [auth])

    const onChangeHandler = (e) => {
        setShow(false)
        if (e.target.type === "number"){
            setData({
                ...data,
                [e.target.name]: e.target.valueAsNumber
            })
            setTierDefaults(e.target.name, e.target.valueAsNumber, data.TIER)
        } else if ((e.target.checked === true || e.target.checked === false) && e.target.name == "formHorizontalRadios") {
            const radio = e.currentTarget.id === 'false' ? false : true
            setData({
                ...data,
                HAS_COLLECTION: radio
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
    }

    function setTierDefaults(type, value, tier) {
        if(type === "TIER") {
            switch (value) {
                case 1:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 5000,
                        HLT: 1725,
                    })
                    setDefaults({
                        atkDef: 325,
                        apValues: 500
                    })
                    break;
                case 2:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 10000,
                        HLT: 1750,
                    })
                    setDefaults({
                        atkDef: 350,
                        apValues: 550
                    })
                    break;
                case 3:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 50000,
                        HLT: 1800,
                    })
                    setDefaults({
                        atkDef: 400,
                        apValues: 600
                    })

                    break;
                case 4:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 100000,
                        HLT: 1850,
                    })
                    setDefaults({
                        atkDef: 425,
                        apValues: 650
                    })
                    break;
                case 5:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 1000000,
                        HLT: 1900,
                    })
                    setDefaults({
                        atkDef: 450,
                        apValues: 700
                    })
                    break;
                case 6:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 5000000,
                        HLT: 1950,
                    })
                    setDefaults({
                        atkDef: 475,
                        apValues: 750
                    })
                    break;
                case 7:
                    setData({
                        ...data,
                        TIER: value,
                        PRICE: 25000000,
                        HLT: 2000,
                    })
                    setDefaults({
                        atkDef: 500,
                        apValues: 800
                    })
                    break;
                default:
                    break;
            }
            
        }
    }

    const onDescriptionHandler = (e) => {
        setShow(false)
        setDesc({
            ...desc,
            TEXT: e.target.value
        })
    }

    const onDescriptionAdd = (e) => {
        e.preventDefault();
        console.log(desc.DESC)
        var temp_desc = desc.DESC
        if (desc.DESC === undefined){
            console.log("IT IS UNDEFINED")
            temp_desc = [desc.TEXT]
        }
        temp_desc.push(desc.TEXT)
        setDesc({
            ...desc,
            DESC: temp_desc,
            TEXT: ""
        })
    }

    const availableHandler = (e) => {
        setData({
            ...data,
            AVAILABLE: Boolean(e.target.value)
        })
    }

    const exclusiveHandler = (e) => {
        setData({
            ...data,
            EXCLUSIVE: Boolean(e.target.value)
        })
    }

    const isSkinHandler = (e) => {
        setData({
            ...data,
            IS_SKIN: Boolean(e.target.value)
        })
    }


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

            const res = await saveCard(data)

            setData(cardInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };
    return auth.loading || universes.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        New Crown Unlimited Card
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
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
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Path</Form.Label>
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
                                            <Form.Label>Focused Path</Form.Label>
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
                                            <Form.Label>Resolved Path</Form.Label>
                                            <Form.Control
                                                value={RPATH}
                                                name="RPATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Ultimate GIF</Form.Label>
                                            <Form.Control
                                                value={GIF}
                                                name="GIF"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Resolved Name</Form.Label>
                                            <Form.Control
                                                value={RNAME}
                                                name="RNAME"
                                                onChange={onChangeHandler}
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control
                                                value={PRICE}
                                                name="PRICE"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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
                                        
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Stamina</Form.Label>
                                            <Form.Control
                                                disabled
                                                value={STAM}
                                                name="STAM"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                        <Form.Label>Passive Type</Form.Label>
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
                                        
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label> Has Destiny </Form.Label>
                                            <Col sm={10}>
                                                <Form.Check
                                                onChange={onChangeHandler}
                                                type="radio"
                                                label="Yes"
                                                name="formHorizontalRadios"
                                                id="true"
                                                checked = {HAS_COLLECTION === true}
                                                />
                                                <Form.Check
                                                onChange={onChangeHandler}
                                                type="radio"
                                                label="No"
                                                name="formHorizontalRadios"
                                                id="false"
                                                checked = {HAS_COLLECTION === false}
                                                />
                                            </Col>
                                            </Form.Group>

                                        <Form.Group hidden={!HAS_COLLECTION} as={Col} md="10" controlId="validationCustom02">
                                        <Form.Label>Destiny</Form.Label>
                                        <Form.Control
                                                value={COLLECTION}
                                                name="COLLECTION"
                                                onChange={onChangeHandler}
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                    </Form.Row>
                                    <p>Total Available Attack / Defense Point Left = {defaults.atkDef - (ATK + DEF)}</p>
                                    <p>Total Available Ability Points Left = {defaults.apValues - (MOVE1_POWER + MOVE2_POWER + MOVE3_POWER)}</p>
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
                                        <Form.Label>Element</Form.Label>
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
                                        <Form.Label>Element</Form.Label>
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
                                        <Form.Label>Element</Form.Label>
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
                                        <Form.Label>Enhancement Type</Form.Label>
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
                                            onChange={availableHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        
                                        </Form.Group>
                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                        <Form.Label> Exclusive </Form.Label>
                                        <Form.Control
                                            as="select"
                                            id="inlineFormCustomSelectPref"
                                            onChange={exclusiveHandler}
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
                                            onChange={isSkinHandler}
                                        >
                                            <option value={true} name="true">Yes</option>
                                            <option value={""} name="false">No</option>
                                        </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label><h4>Select Character For Skin</h4></Form.Label>
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
                                            <Form.Label>Weaknesses</Form.Label>
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
                                            <Form.Label>Resistances</Form.Label>
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
                                            <Form.Label>Repels</Form.Label>
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
                                            <Form.Label>Immunity</Form.Label>
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
                                            <Form.Label>Absorbs</Form.Label>
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
                                    <Link to="/updatecards"><Button variant="warning">Update Cards</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                </Form>

                                {/* DESCRIPTION WORK
                                 <Form>
                                <Form.Row>
                                        <Form.Group as={Col} md="10">
                                                <Form.Label>Descriptions</Form.Label>
                                                <Form.Control
                                                    value={desc.TEXT}
                                                    onChange={onDescriptionHandler}
                                                    name={desc.TEXT}
                                                    required
                                                    type="text"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="2">
                                            <Form.Label>Queue Description</Form.Label>
                                            <Button onClick={onDescriptionAdd} variant="success">Add</Button>
                                        </Form.Group>
                                        
                                        {desc.DESC.map((item, index) => (
                                        <Form.Group as={Col} md="8">
                                            
                                                <Form.Control
                                                value={item}
                                                name={item}
                                                type="text"
                                                key={index}
                                                />
                                            
                                            <Button onClick={onDescriptionAdd} variant="danger">Delete</Button>
                                        </Form.Group>
                                        ))}
                                        
                                        
                                       
                                    </Form.Row>
                                </Form> */}

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

export default connect(mapStateToProps, {saveCard})(NewCard)
