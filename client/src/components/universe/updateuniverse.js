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
        UTITLE,
        UPET,
        UARM,
        DTITLE,
        DARM,
        DPET,
        UNIVERSE_BOSS
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
                        TITLE: universe.TITLE,
                        PATH: universe.PATH,
                        PREREQUISITE: universe.PREREQUISITE,
                        TIER: universe.TIER,
                        CROWN_TALES: universe.CROWN_TALES,
                        HAS_CROWN_TALES: universe.HAS_CROWN_TALES,
                        UTITLE: universe.UTITLE,
                        UPET: universe.UPET,
                        UARM: universe.UARM,
                        DTITLE: universe.DTITLE,
                        DARM: universe.DARM,
                        DPET: universe.DPET,
                        UNIVERSE_BOSS: universe.UNIVERSE_BOSS
                    })
                }
            })
        }

        var universePrereqSelector = universes.universe.map(universe => {
            return {
                value: universe.TITLE, label: `${universe.TITLE}`
            }
        })
    
        var universePrereqHandler = (e) => {
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

                                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                                            <Form.Label>Prerequisite - {PREREQUISITE}</Form.Label>
                                            <Select
                                                onChange={universePrereqHandler}
                                                options={
                                                    universePrereqSelector
                                                }
                                                styles={styleSheet}
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
