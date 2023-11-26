import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { universeInitialState } from '../STATE';
import { updateUniverse, saveUniverse, deleteUniverse } from '../../actions/universes';

export const UpdateUniverse = ({auth, history, updateUniverse, deleteUniverse}) => {
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

    const [universeData, setUniverseData] = useState({
        loading: true
    })
    const [data, setData] = useState(universeInitialState);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
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
        }
    }, [auth])
    const onChangeHandler = (e) => {
        setShow(false);
    
        const { type, name, value } = e.target;
        
        // For input of type number
        if (type === "number") {
            setData(prevData => ({
                ...prevData,
                [name]: parseFloat(value) // Use parseFloat to convert string to number
            }));
            return;
        }
    
        // For HAS_CROWN_TALES and HAS_DUNGEON fields
        if (name === "HAS_CROWN_TALES" || name === "HAS_DUNGEON") {
            // Convert the string "true" to Boolean true, everything else to false
            const booleanValue = value === "true";
            setData(prevData => ({
                ...prevData,
                [name]: booleanValue
            }));
            return;
        }
    
        // For other inputs
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    console.log(data)
    if(!universes.loading) {
        var universeSelector = universes.universe.map(universe => {
            return {
                value: universe.TITLE, label: `${universe.TITLE}`
            }
        })
    
        var universeHandler = (selectedOption) => {
            // Find the selected universe
            const selectedUniverse = universes.universe.find(universe => selectedOption.value === universe.TITLE);
        
            if (selectedUniverse) {
                setData({
                    ...data,
                    ...selectedUniverse // Spread the properties of the selected universe
                });
        
                // Use the TITLE from the selected universe for Axios calls
                axios.get(`/crown/arms/universe/${selectedUniverse.TITLE}`)
                    .then((res) => {
                        setArm({ arm: res.data, loading: false });
                    });
        
                axios.get(`/crown/cards/universe/${selectedUniverse.TITLE}`)
                    .then((res) => {
                        setCard({ card: res.data, loading: false });
                    });
            }
        };
    }


    if(!cards.loading) {
        var cardSelector = cards.card.map(card => {
            return {
                value: card.NAME, label: `${card.NAME} - ${card.TIER}`
            }
        })

        var crownTalesHandler = (selectedOptions) => {
            // selectedOptions is the current state of selected items
            if (selectedOptions) {
                // Map the selected options to their values
                const newEnemies = selectedOptions.map(option => option.value);
        
                // Update the data state with the new list of enemies
                setData({
                    ...data,
                    CROWN_TALES: newEnemies,
                });
            } else {
                // If nothing is selected, set ENEMIES to an empty array
                setData({
                    ...data,
                    CROWN_TALES: [],
                });
            }
        };

        var dungeonHandler = (selectedOptions) => {
            // selectedOptions is the current state of selected items
            if (selectedOptions) {
                // Map the selected options to their values
                const newEnemies = selectedOptions.map(option => option.value);
        
                // Update the data state with the new list of enemies
                setData({
                    ...data,
                    DUNGEONS: newEnemies,
                });
            } else {
                // If nothing is selected, set ENEMIES to an empty array
                setData({
                    ...data,
                    DUNGEONS: [],
                });
            }
        };

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
            console.log(data)
            const res = await updateUniverse(data)

            setData(universeInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteUniverse(data);
        setModalShow(false);
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
                        New Crown Unlimited Arm
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Select Universe - {TITLE}</Form.Label>
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

                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                            <Form.Label>Universe Image Path</Form.Label>
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
                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Tales Lineup</Form.Label>
                                            <Select
                                                onChange={crownTalesHandler}
                                                value={CROWN_TALES.map(enemy => ({ label: enemy, value: enemy }))}
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
                                            <Form.Label>Dungeon Lineup</Form.Label>
                                            <Select
                                                onChange={dungeonHandler}
                                                value={DUNGEONS.map(enemy => ({ label: enemy, value: enemy }))}
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
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Tales Available?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="HAS_CROWN_TALES"
                                                id="inlineFormCustomSelectPref"
                                                onChange={onChangeHandler}
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={""}>No</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                            <Form.Label>Dungeon Available?</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="HAS_DUNGEON"
                                                id="inlineFormCustomSelectPref"
                                                onChange={onChangeHandler}
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={""}>No</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Button type="submit">Update Universe</Button>
                                    <br />
                                    <br />
                                    <Link to="/newuniverse"><Button variant="outline-warning">New Universe</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}

                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this Arm?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Arm
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    
                                    

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

export default connect(mapStateToProps, {saveUniverse, updateUniverse, deleteUniverse})(UpdateUniverse)
