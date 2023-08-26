import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import { titleInitialState, enhancements, unlock_methods, elements, title_abilities, title_explanations } from '../STATE';
import { updateTitle, deleteTitle } from '../../actions/titles'

export const UpdateTitle = ({auth, history, updateTitle, deleteTitle}) => {
    const [universeList, setUniverseList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(titleInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [abilities, setAbilities] = useState([{ ABILITY: "", POWER: 0, ELEMENT: "", DURATION: 0 }]);
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const [titleData, setTitleData] = useState({
        loading: true
    })

    useEffect(() => {
        if(!auth.loading){
            axios.get('/crown/universes')
                .then((res) => {
                    setUniverseList(res.data);
                    setIsLoading(false);
                });

            axios.get('/crown/titles')
                .then((res) => {
                    setTitleData({data: res.data, loading: false})
                    setIsLoading(false);
                })
        }
      }, [auth])

    const onChangeHandler = (e) => {
        const { type, name, value, valueAsNumber } = e.target;
        let newValue = type === "number" ? valueAsNumber : value;
        setData(prevData => ({ ...prevData, [name]: newValue }));
    }


    const handleSelectorChange = (selectedOption, actionMeta) => {
        if (actionMeta.name === "universe") {
            setData(prevData => ({ ...prevData, UNIVERSE: selectedOption.value }));
        } else if (actionMeta.name.startsWith("ability-")) {
            const index = parseInt(actionMeta.name.split("-")[1]);
            const updatedAbilities = [...abilities];
            updatedAbilities[index][actionMeta.name.split("-")[2]] = selectedOption.value;
            setAbilities(updatedAbilities);
        } else if (actionMeta.name === "unlock-method") {
            setData(prevData => ({ ...prevData, UNLOCK_METHOD: { ...prevData.UNLOCK_METHOD, METHOD: selectedOption.value }}));
        } else if (actionMeta.name === "unlock-element") {
            setData(prevData => ({ ...prevData, UNLOCK_METHOD: { ...prevData.UNLOCK_METHOD, ELEMENT: selectedOption.value }}));
        }
    }

    if(!titleData.loading) {
        var titleSelector = titleData.data.map(title => {
            return {
                value: title.TITLE, label: `${title.TITLE}`
            }
        })
    
        var titleHandler = (e) => {
            let value = e[0]
            titleData.data.map(title => {
                if (e.value === title.TITLE) {
                    setData({
                        ...data,
                        TITLE: title.TITLE,
                        ABILITIES: [{ ABILITY: "", POWER: 0, ELEMENT: "", DURATION: 0 }],
                        UNIVERSE: title.UNIVERSE,
                        AVAILABLE: title.AVAILABLE,
                        RARITY: title.RARITY,
                        UNLOCK_METHOD: title.UNLOCK_METHOD,
                        ID: title.ID, 
                    })
                    setAbilities(title.ABILITIES)
                }
            })
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

            const updatedData = { ...data, ABILITIES: abilities };
            console.log(data)
            const res = await updateTitle(updatedData)

            setData(titleInitialState);
            setAbilities([{ ABILITY: "", POWER: 0, ELEMENT: "", DURATION: 0 }]);
            setTimeout(()=> {setShow(true)}, 1000)
        }

    }

    const onDeleteHandler = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        const res = await deleteTitle(data);
        setData(titleInitialState);
        setAbilities([{ ABILITY: "", POWER: 0, ELEMENT: "", DURATION: 0 }]);
        setModalShow(false);
    }

    const styleSheet = {
        input: base => ({ ...base, color: 'white' })
    };

    const universeOptions = universeList.map(universe => ({ value: universe.TITLE, label: universe.TITLE }));
    const titleAbilityOptions = title_abilities.map(ability => ({ value: ability, label: ability }));
    const enhancementOptions = enhancements.map(enhancement => ({ value: enhancement, label: enhancement }));
    const unlockMethodsOptions = unlock_methods.map(method => ({ value: method, label: method }));
    const elementsOptions = elements.map(element => ({ value: element, label: element }));


    return isLoading ? (
        <Spinner />
    ) : (
        <div>
            <div className="page-header">
                <h3 className="page-title">
                    Update Title
                </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Title Name</Form.Label>
                                        <Select
                                            onChange={titleHandler}
                                            options={titleSelector}
                                            styles={styleSheet}
                                            name="TITLE"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <Form.Label>Select Universe - {data.UNIVERSE}</Form.Label>
                                        <Select
                                            onChange={handleSelectorChange}
                                            options={universeOptions}
                                            styles={styleSheet}
                                            name="universe"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                {abilities.map((ability, index) => (
                                    <div key={index}>
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Ability</Form.Label>
                                                <Select
                                                    onChange={handleSelectorChange}
                                                    options={titleAbilityOptions}
                                                    name={`ability-${index}-ABILITY`}
                                                    value={{ value: ability.ABILITY, label: ability.ABILITY }}
                                                />                                                    
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Power</Form.Label>
                                                <Form.Control
                                                    value={ability.POWER}
                                                    onChange={(e) => {
                                                        const updatedAbilities = [...abilities];
                                                        updatedAbilities[index].POWER = e.target.valueAsNumber;
                                                        setAbilities(updatedAbilities);
                                                    }}
                                                    name={`ability-${index}-POWER`}
                                                    required
                                                    type="number"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Element</Form.Label>
                                                <Select
                                                    onChange={handleSelectorChange}
                                                    options={elementsOptions}
                                                    name={`ability-${index}-ELEMENT`}
                                                    value={{ value: ability.ELEMENT, label: ability.ELEMENT }}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control
                                                    value={ability.DURATION}
                                                    onChange={(e) => {
                                                        const updatedAbilities = [...abilities];
                                                        updatedAbilities[index].DURATION = e.target.valueAsNumber;
                                                        setAbilities(updatedAbilities);
                                                    }}
                                                    name={`ability-${index}-DURATION`}
                                                    required
                                                    type="number"
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        {abilities.length > 1 && (
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    const updatedAbilities = [...abilities];
                                                    updatedAbilities.splice(index, 1);
                                                    setAbilities(updatedAbilities);
                                                }}
                                            >
                                                Remove Ability
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {abilities.length < 3 && (
                                    <Button
                                        onClick={() => setAbilities([...abilities, { ABILITY: "", POWER: 0, ELEMENT: "", DURATION: 0 }])}
                                    >
                                        Add Ability
                                    </Button>
                                )}
                                
                                <Form.Row>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Unlock Value</Form.Label>
                                        <Form.Control
                                            value={data.UNLOCK_METHOD.VALUE}
                                            onChange={onChangeHandler}
                                            name="VALUE"
                                            required
                                            type="number"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Unlock Element</Form.Label>
                                        <Select
                                            onChange={handleSelectorChange}
                                            options={elementsOptions}
                                            name="unlock-element"
                                            value={{ value: data.UNLOCK_METHOD.ELEMENT, label: data.UNLOCK_METHOD.ELEMENT } ?? ""}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4">
                                        <Form.Label>Unlock Method</Form.Label>
                                        <Select
                                            onChange={handleSelectorChange}
                                            options={unlockMethodsOptions}
                                            name="unlock-method"
                                            value={{ value: data.UNLOCK_METHOD.METHOD, label: data.UNLOCK_METHOD.METHOD } ?? ""}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit">Update Title</Button>
                                    <br/>
                                    <br />
                                    <Link to="/newtitle"><Button as={Col} md="2" variant="outline-warning">New Title</Button></Link> 
                                    <br/>
                                    <br />
                                    {submission_alert_dom}

                                    <Button onClick={handleShow} as={Col} md="2" variant="danger">Delete</Button>

                                    <Modal show={modalShow} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Are you sure you want delete this Title?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="danger" onClick={onDeleteHandler}>
                                            Delete Title
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                            </Form>
                        </div>

                        <div>
                        <h2>Ability Titles and Explanations</h2>
                        <ul>
                            {Object.entries(title_explanations).map(([title, explanation]) => (
                            <li key={title}>
                                <strong>{title}:</strong> {explanation}
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    cards: state.cards
})

export default connect(mapStateToProps, {updateTitle, deleteTitle})(UpdateTitle)
