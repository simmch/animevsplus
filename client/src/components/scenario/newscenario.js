import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { scenarioInitialState, tactics } from '../STATE'
import { saveScenario } from '../../actions/scenarios'

export const NewScenario = ({auth, history, saveScenario}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });

    const [cards, setCard] = useState({
        card: [],
        loading: true
    });

    const [arms, setArm] = useState({
        arm: [],
        loading: true
    });

    const [data, setData] = useState(scenarioInitialState);
    const [scenarioData, setScenario] = useState({
        scenarios: [],
        loading: true
    });

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        TITLE,
        MUST_COMPLETE,
        IS_RAID,
        IMAGE,
        ENEMY_LEVEL,
        ENEMIES,
        EASY_DROPS,
        NORMAL_DROPS,
        HARD_DROPS,
        UNIVERSE,
        AVAILABLE,
        DESTINY_CARDS,
        TACTICS,
        IS_DESTINY
    } = data;

    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
                })
        }
    }, [auth])

    const onChangeHandler = (e) => {
        setShow(false);
    
        let value = e.target.value;
    
        if (e.target.type === "number") {
            value = e.target.valueAsNumber;
        } else if (e.target.name === "AVAILABLE" || e.target.name === "IS_RAID" || e.target.name === "IS_DESTINY") {
            value = Boolean(e.target.value);
        }
    
        setData(prevData => ({
            ...prevData,
            [e.target.name]: value
        }));
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
                    
                axios.get(`/crown/arms/universe/${universe.TITLE}`)
                    .then((res) => {
                        setArm({arm: res.data, loading: false})
                    })

                axios.get(`/crown/cards/universe/${universe.TITLE}`)
                    .then((res) => {
                        setCard({card: res.data, loading: false})
                    })

                axios.get(`/crown/scenarios/universe/${universe.TITLE}`)
                    .then((res) => {
                        console.log(res.data)
                        setScenario({scenarios: res.data, loading: false})
                    })
    
                }
            })
        }
    }
    
    if(!arms.loading && !cards.loading) {
        var armSelector = arms.arm.map(arm => {
            return {
                value: arm.ARM, label: `${arm.ARM}`
            }
        })

        var cardSelector = cards.card.map(card => {
            return {
                value: card.NAME, label: `${card.NAME} - ${card.DROP_STYLE}`
            }
        })

        var reward_selector = arms.arm.map(arm => ({
            value: arm.ARM, 
            label: `${arm.ARM}`
        })).concat(cards.card.map(card => ({
            value: card.NAME, 
            label: `${card.NAME} - ${card.DROP_STYLE}`
        })));

        var enemyHandler = (selectedOptions) => {
            // selectedOptions is the current state of selected items
            if (selectedOptions) {
                // Map the selected options to their values
                const newEnemies = selectedOptions.map(option => option.value);
        
                // Update the data state with the new list of enemies
                setData({
                    ...data,
                    ENEMIES: newEnemies,
                });
            } else {
                // If nothing is selected, set ENEMIES to an empty array
                setData({
                    ...data,
                    ENEMIES: [],
                });
            }
        };

        var destinyCardHandler = (selectedOptions) => {
            if(selectedOptions){
                const newDestinyCardList = selectedOptions.map(option => option.value);

                setData({
                    ...data,
                    DESTINY_CARDS: newDestinyCardList,
                    IS_DESTINY: true
                })
                
            } else {
                setData({
                    ...data,
                    DESTINY_CARDS: [],
                    IS_DESTINY: false
                })
            }
        }


        var bannedCardsHandler = (e) => {
            if(e != null){
                let value = e
                const cardList = [];
                for(const c of value){
                    if(!data.BANNED_CARDS.includes(c)){
                        cardList.push(c.value)
                    }
                }
                if(cardList){
                    setData({
                        ...data,
                        BANNED_CARDS: cardList,
                    })
                }
                
            }
        }
    }
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

    const easyArmHandler = (e) => genericHandler(e, 'EASY_DROPS');
    const normalArmHandler = (e) => genericHandler(e, 'NORMAL_DROPS');
    const hardArmHandler = (e) => genericHandler(e, 'HARD_DROPS');

    var scenarioHandler = (e) => {
        if(e != null){
            let value = e
            const scenarioList = [];
            for(const ti of value){
                if(!data.MUST_COMPLETE.includes(ti)){
                    scenarioList.push(ti.value)
                }
            }
            if(scenarioList){
                setData({
                    ...data,
                    MUST_COMPLETE: scenarioList,
                })
            }
            
        }
    }

    if(!scenarioData.loading) {
        var scenarioSelector = scenarioData.scenarios.map(scenario => {
            return {
                value: scenario.TITLE, label: `${scenario.TITLE}`
            }
        })
    }


    var tacticsHandler = (e) => {
        let value = e[0]
        tactics.map(tactic => {
            if (e.value === tactic) {
                setData({
                    ...data,
                    TACTICS: tactic,
                })
            }
        })
    };

    var tacticsSelector = tactics.map(tactic => {
        return {
            value: tactic, label: `${tactic}`
        }
    });

    console.log(data)
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

            const res = await saveScenario(data)

            setData(scenarioInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    return auth.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        New Arm
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Scenario Universe - {UNIVERSE}</Form.Label>
                                            <Select
                                                onChange={universeHandler}
                                                options={
                                                    universeSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Scenario Title</Form.Label>
                                            <Form.Control
                                                value={TITLE}
                                                onChange={onChangeHandler}
                                                name="TITLE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>


                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Enemy Level</Form.Label>
                                            <Form.Control
                                                value={ENEMY_LEVEL}
                                                name="ENEMY_LEVEL"
                                                onChange={onChangeHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>                                        
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Scenario Image URL</Form.Label>
                                            <Form.Control
                                                value={IMAGE}
                                                onChange={onChangeHandler}
                                                name="IMAGE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Scenario Enemies</Form.Label>
                                            <Select
                                                onChange={enemyHandler}
                                                isMulti
                                                options={cardSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Easy Mode Rewards</Form.Label>
                                            <Select
                                                onChange={easyArmHandler}
                                                value={EASY_DROPS.map(arm => ({ label: arm, value: arm }))}
                                                isMulti
                                                options={reward_selector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
 
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Normal Mode Rewards</Form.Label>
                                            <Select
                                                onChange={normalArmHandler}
                                                value={NORMAL_DROPS.map(arm => ({ label: arm, value: arm }))}
                                                isMulti
                                                options={reward_selector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
 
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Hard Mode Rewards</Form.Label>
                                            <Select
                                                onChange={hardArmHandler}
                                                value={HARD_DROPS.map(arm => ({ label: arm, value: arm }))}
                                                isMulti
                                                options={reward_selector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
 
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Is This Scenario Available?</Form.Label>
                                            
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
                                            <Form.Label>Is This Scenario A Raid?</Form.Label>
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
                                            <Form.Label>Is This Scenario / Raid A Destiny?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="inlineFormCustomSelectPref"
                                                onChange={onChangeHandler}
                                            >
                                                <option value={true} name="true">Yes</option>
                                                <option value={""} name="false">No</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Which Cards Need To Be Used For This Destiny?</Form.Label>
                                            <Select
                                                onChange={destinyCardHandler}
                                                isMulti
                                                options={cardSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Raid / Destiny Tactics</Form.Label>
                                            <Select
                                                onChange={tacticsHandler}
                                                isMulti
                                                options={tacticsSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Must First Complete These Scenarios</Form.Label>
                                            <Select
                                                onChange={scenarioHandler}
                                                isMulti
                                                options={scenarioSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    
                                    <Button type="submit">Create Scenario</Button>
                                    <br />
                                    <br />
                                    {auth.user.data.IS_ADMIN ? 
                                    <Link to="/updatescenario"><Button variant="warning">Update Scenario</Button></Link> 
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

export default connect(mapStateToProps, {saveScenario})(NewScenario)
