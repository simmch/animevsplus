import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { petInitialState, enhancements } from '../STATE';
import { updatePet, deletePet } from '../../actions/pets';
import _ from 'lodash';

export const UpdatePet = ({auth, pets, history, updatePet, deletePet}) => {
    const [universes, setUniverse] = useState({
        universe: [],
        loading: true
    });
    const [petData, setPetData] = useState({
        loading: true
    });
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [data, setData] = useState(petInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [ability, setAbility] = useState({
        ABILITY: "",
        POWER: 20,
        ABILITY_TYPE: ""
    });
    // Build Ability
    var pass_ability = ability.ABILITY.toString()
    var pass_power = ability.POWER
    var pass_type = ability.ABILITY_TYPE
    var pass_key = pass_ability
    var ability_Object = {}
    ability_Object[pass_key] = pass_power
    ability_Object["TYPE"] = pass_type

    const {
        PET,
        PATH,
        UNIVERSE,
        LVL,
        ABILITIES,
        COLLECTION,
        AVAILABLE,
        EXCLUSIVE} = data;

    
    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverse({universe: res.data, loading: false})
                })

            axios.get('/crown/pets')
                .then((res) => {
                    setPetData({data: res.data, loading: false})
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
        } else {
            setAbility({
                ...ability,
                [e.target.name]: e.target.value
            })
        }

        // // Build Ability
        // var pass_ability = ability.ABILITY.toString()
        // var pass_power = ability.POWER
        // var pass_type = ability.ABILITY_TYPE
        // var pass_key = pass_ability
        // var ability_Object = {}
        // ability_Object[pass_key] = pass_power
        // ability_Object["TYPE"] = pass_type
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

    var abilityEnhancementHandler = (e) => {
        let value = e[0]
        enhancements.map(enhancement => {
            if (e.value === enhancement) {
                setAbility({
                    ...ability,
                    ABILITY_TYPE: enhancement,
                })
            }
        })
    }

    
    if(!petData.loading) {
        var petSelector = petData.data.map(pet => {
            return {
                value: pet.PET, label: `${pet.PET}`
            }
        })
    
        var petHandler = (e) => {
            let value = e[0]
            petData.data.map(pet => {
                if (e.value === pet.PET) {
                    // Ability Breakdown
                    var ability_ability = Object.keys(pet.ABILITIES[0])[0]
                    var ability_power = Object.values(pet.ABILITIES[0])[0]
                    var ability_enhancement = Object.values(pet.ABILITIES[0])[1]
                    setAbility({
                        ...ability,
                        ABILITY: ability_ability,
                        POWER: ability_power,
                        ABILITY_TYPE: ability_enhancement
                    })

                    // Build Ability
                    var pass_ability = ability.ABILITY.toString()
                    var pass_power = ability.POWER
                    var pass_type = ability.ABILITY_TYPE
                    var pass_key = pass_ability
                    var ability_Object = {}
                    ability_Object[pass_key] = pass_power
                    ability_Object["TYPE"] = pass_type
                   
                    setData({
                        ...data,
                        PET: pet.PET,
                        PATH: pet.PATH,
                        UNIVERSE: pet.UNIVERSE,
                        LVL: pet.LVL,
                        ABILITIES: [ability_Object],
                        COLLECTION: pet.COLLECTION,
                        AVAILABLE: pet.AVAILABLE,
                        EXCLUSIVE: pet.EXCLUSIVE
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

            
            var pet_update_data = data;
            pet_update_data.ABILITIES = [ability_Object]
            const res = await updatePet(pet_update_data)
            
            setData(petInitialState)
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deletePet(data);
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
                        Update Pets
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="pet">
                            <div className="pet-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label><h3>Select Pet</h3></Form.Label>
                                            <Select
                                                onChange={petHandler}
                                                options={
                                                    petSelector
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
                                        <Form.Group as={Col} md="6" controlId="validationCustom13">
                                            <Form.Label>Ability</Form.Label>
                                            <Form.Control
                                                value={ability.ABILITY}
                                                name="ABILITY"
                                                onChange={abilityHandler}
                                                required
                                                type="text"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationCustom14">
                                            <Form.Label>Ability Power</Form.Label>
                                            <Form.Control
                                                value={ability.POWER}
                                                name="POWER"
                                                onChange={abilityHandler}
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom15">
                                        <Form.Label>Ability Type - {ability.ABILITY_TYPE}</Form.Label>
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
                                        <Form.Group as={Col} md="2" controlId="validationCustom27">
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
                                            <Form.Group as={Col} md="2" controlId="validationCustom28">
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
                                    <Button type="submit">Update Pet</Button>
                                    <br />
                                    <br />
                                    <Link to="/newpet"><Button as={Col} md="2" variant="outline-warning">New Pet</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}
                                    
                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this pet?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Pet
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
    pets: state.pets
})

export default connect(mapStateToProps, {updatePet, deletePet})(UpdatePet)
