import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { universeInitialState } from '../STATE'
import { saveUniverse } from '../../actions/universes'

export const NewUniverse = ({auth, history, saveUniverse}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });

    const [cards, setCard] = useState({
        card: [],
        loading: true
    });

    const [pets, setPet] = useState({
        pet: [],
        loading: true
    });

    const [arms, setArm] = useState({
        arm: [],
        loading: true
    });

    const [titles, setTitle] = useState({
        title: [],
        loading: true
    });


    const [data, setData] = useState(universeInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        TITLE,
        PATH,
        PREREQUISITE,
        TIER,
        CROWN_TALES,
        HAS_CROWN_TALES,
        HAS_DUNGEON,
        DUNGEONS,
        UTITLE,
        UPET,
        UARM,
        DTITLE,
        DARM,
        DPET,
        GUILD,
        UNIVERSE_BOSS,
        CORRUPTED,
        CORRUPTION_LEVEL,
    } = data;

    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
                })

            axios.get('/crown/cards')
                .then((res) => {
                    setCard({card: res.data, loading: false})
                })

            axios.get('/crown/arms')
                .then((res) => {
                    setArm({arm: res.data, loading: false})
                })

            axios.get('/crown/titles')
                .then((res) => {
                    setTitle({title: res.data, loading: false})
                })

            axios.get('/crown/pets')
                .then((res) => {
                    setPet({pet: res.data, loading: false})
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
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        
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
                        PREREQUISITE: universe.TITLE,
                    })
                }
            })
        }
    }

    if(!pets.loading) {
        var petSelector = pets.pet.map(pet => {
            return {
                value: pet.PET, label: `${pet.PET}`
            }
        })
    
        var uPetHandler = (e) => {
            let value = e[0]
            pets.pet.map(pet => {
                if (e.value === pet.PET) {
                    setData({
                        ...data,
                        UPET: pet.PET,
                    })
                }
            })
        }

        var dPetHandler = (e) => {
            let value = e[0]
            pets.pet.map(pet => {
                if (e.value === pet.PET) {
                    setData({
                        ...data,
                        DPET: pet.PET,
                    })
                }
            })
        }

    }

    if(!titles.loading) {
        var titleSelector = titles.title.map(title => {
            return {
                value: title.TITLE, label: `${title.TITLE}`
            }
        })
    
        var uTitleHandler = (e) => {
            let value = e[0]
            titles.title.map(title => {
                if (e.value === title.TITLE) {
                    setData({
                        ...data,
                        UTITLE: title.TITLE,
                    })
                }
            })
        }

        var dTitleHandler = (e) => {
            let value = e[0]
            titles.title.map(title => {
                if (e.value === title.TITLE) {
                    setData({
                        ...data,
                        DTITLE: title.TITLE,
                    })
                }
            })
        }

    }

    if(!arms.loading) {
        var armSelector = arms.arm.map(arm => {
            return {
                value: arm.ARM, label: `${arm.ARM}`
            }
        })
    
        var uArmHandler = (e) => {
            let value = e[0]
            arms.arm.map(arm => {
                if (e.value === arm.ARM) {
                    setData({
                        ...data,
                        UARM: arm.ARM,
                    })
                }
            })
        }

        var dArmHandler = (e) => {
            let value = e[0]
            arms.arm.map(arm => {
                if (e.value === arm.ARM) {
                    setData({
                        ...data,
                        DARM: arm.ARM,
                    })
                }
            })
        }


    }

    if(!cards.loading) {
        var cardSelector = cards.card.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })

        var talesCardList = (e) => {
            if(e != null){
                let value = e
                const enemyTalesList = [];
                for(const e of value){
                    if(!data.CROWN_TALES.includes(e)){
                        enemyTalesList.push(e.value)
                    }
                }
                if(enemyTalesList){
                    setData({
                        ...data,
                        CROWN_TALES: enemyTalesList,
                        HAS_CROWN_TALES: true
                    })
                }
                
            }
        }

        var dungeonCardList = (e) => {
            if(e != null){
                let value = e
                const enemyDungeonList = [];
                for(const e of value){
                    if(!data.DUNGEONS.includes(e)){
                        enemyDungeonList.push(e.value)
                    }
                }
                if(enemyDungeonList){
                    setData({
                        ...data,
                        DUNGEONS: enemyDungeonList,
                        HAS_DUNGEON: true
                    })
                }
                
            }
        }

    }


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

            const res = await saveUniverse(data)

            setData(universeInitialState)
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
                        New Crown Unlimited Arm
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Universe Name</Form.Label>
                                            <Form.Control
                                                value={TITLE}
                                                onChange={onChangeHandler}
                                                name="TITLE"
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Path</Form.Label>
                                            <Form.Control
                                                value={PATH}
                                                name="PATH"
                                                onChange={onChangeHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Tales Title</Form.Label>
                                            <Select
                                                options={titleSelector}
                                                onChange={uTitleHandler}
                                                styles={styleSheet}

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Dungeon Title</Form.Label>
                                            <Select
                                                options={titleSelector}
                                                onChange={dTitleHandler}
                                                styles={styleSheet}

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Tales Arm</Form.Label>
                                                <Select
                                                    options={armSelector}
                                                    onChange={uArmHandler}
                                                    styles={styleSheet}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Dungeon Arm</Form.Label>
                                                <Select
                                                    options={armSelector}
                                                    onChange={dArmHandler}
                                                    styles={styleSheet}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Tales Summon</Form.Label>
                                                <Select
                                                    options={petSelector}
                                                    onChange={uPetHandler}
                                                    styles={styleSheet}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Dungeon Summon</Form.Label>
                                                <Select
                                                    options={petSelector}
                                                    onChange={dPetHandler}
                                                    styles={styleSheet}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Tales Enemies</Form.Label>
                                                <Select
                                                    options={cardSelector}
                                                    onChange={talesCardList}
                                                    styles={styleSheet}
                                                    isMulti
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
    
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Dungeon Enemies</Form.Label>
                                                <Select
                                                    options={cardSelector}
                                                    onChange={dungeonCardList}
                                                    styles={styleSheet}
                                                    isMulti
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                    </Form.Row>

                                    <Button type="submit">Create Universe</Button>
                                    <br />
                                    <br />
                                    <Link to="/updateuniverse"><Button variant="warning">Update Universe</Button></Link> 
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

export default connect(mapStateToProps, {saveUniverse})(NewUniverse)
