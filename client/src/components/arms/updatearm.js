import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { armInitialState, arm_enhancements, elements } from '../STATE'
import { updateArm, deleteArm } from '../../actions/arms'

export const UpdateArm = ({auth, history, updateArm, deleteArm}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });

    const [armData, setArmData] = useState({
        loading: true
    })

    const [data, setData] = useState(armInitialState);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [ability, setAbility] = useState({
        POWER: 20,
        ABILITY_TYPE: ""
    });
    // Build ability
    var pass_power = ability.POWER
    var pass_type = ability.ABILITY_TYPE
    var abililty_Object = {}
    abililty_Object[pass_type] = pass_power

    const {
        ARM,
        PRICE,
        TOURNAMENT_REQUIREMENTS,
        ABILITIES,
        UNIVERSE,
        COLLECTION,
        STOCK,
        AVAILABLE,
        EXCLUSIVE, 
        ELEMENT
    } = data;
    
    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
                })

            axios.get('/crown/arms')
                .then((res) => {
                    setArmData({data: res.data, loading: false})
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

    const abilityHandler = (e) => {
        if (e.target.type === "number"){
            setAbility({
                ...ability,
                [e.target.name]: e.target.valueAsNumber
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
                        UNIVERSE: universe.TITLE,
                    })
                }
            })
        }
    }

    if(!armData.loading) {
        var armSelector = armData.data.map(arm => {
            return {
                value: arm.ARM, label: `${arm.ARM}`
            }
        })
    
        var armHandler = (e) => {
            let value = e[0]
            armData.data.map(arm => {
                if (e.value === arm.ARM) {
                    // Passive Breakdown
                    var type = Object.keys(arm.ABILITIES[0])[0]
                    var power = Object.values(arm.ABILITIES[0])[0]

                    setAbility({
                        ...ability,
                        POWER: power,
                        ABILITY_TYPE: type
                    })

                    var pass_power = ability.POWER
                    var pass_type = ability.PASSIVE_TYPE
                    var abilities_Object = {}
                    abilities_Object[pass_type] = pass_power

                    setData({
                        ...data,
                        ARM: arm.ARM,
                        PRICE: arm.PRICE,
                        TOURNAMENT_REQUIREMENTS: arm.TOURNAMENT_REQUIREMENTS,
                        ABILITIES: [abilities_Object],
                        UNIVERSE: arm.UNIVERSE,
                        COLLECTION: "N/A",
                        STOCK: arm.STOCK,
                        AVAILABLE: arm.AVAILABLE,
                        EXCLUSIVE: arm.EXCLUSIVE,
                        ELEMENT: arm.ELEMENT
                    })
                }
            })
        }
    }

    var enhancementSelector = arm_enhancements.map(enhancement => {
        return {
            value: enhancement, label: `${enhancement}`
        }
    })

    var elementSelector = elements.map(element => {
        return {
            value: element, label: `${element}`
        }
    })

    var elementEnhancementHandler = (e) => {
        let value = e[0]
        elements.map(element => {
            if (e.value === element) {
                setData({
                    ...data,
                    ELEMENT: element,
                })
            }
        })
    }



    var abilityEnhancementHandler = (e) => {
        let value = e[0]
        arm_enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setAbility({
                    ...ability,
                    ABILITY_TYPE: enhancement,
                })
            }
        })

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

            var arm_update_data = data;
            arm_update_data.ABILITIES = [abililty_Object]
            const res = await updateArm(arm_update_data)

            setData(armInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteArm(data);
        setModalShow(false);
    }

    const styleSheet = {
        input: (base, state) => ({
            ...base,
            color: 'white'

        })
    };

    console.log(data)
    return auth.loading || universes.loading ? (
        <Spinner />
    ) : (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Update Arm
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label><h3>Select Arm</h3></Form.Label>
                                            <Select
                                                onChange={armHandler}
                                                options={
                                                    armSelector
                                                }
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>

                                    <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Power</Form.Label>
                                            <Form.Control
                                                value={ability.POWER}
                                                name="POWER"
                                                onChange={abilityHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Type - {ability.ABILITY_TYPE}</Form.Label>
                                            <Select
                                                onChange={abilityEnhancementHandler}
                                                options={
                                                    enhancementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Element - {ELEMENT}</Form.Label>
                                            <Select
                                                onChange={elementEnhancementHandler}
                                                options={
                                                    elementSelector
                                                }
                                                required
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
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

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control
                                                value={STOCK}
                                                name="STOCK"
                                                onChange={onChangeHandler}
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
                                    </Form.Row>
                                    <Button type="submit">Update Arm</Button>
                                    <br/>
                                    <br />
                                    <Link to="/newarm"><Button as={Col} md="2" variant="outline-warning">New Arm</Button></Link> 
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

export default connect(mapStateToProps, {updateArm, deleteArm})(UpdateArm)
