import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import Spinner from '../isLoading/spinner';
import { Typeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { abyssInitialState } from '../STATE'
import { saveAbyss } from '../../actions/abyss'

export const NewAbyss = ({auth, history, saveAbyss}) => {
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

    const [titles, setTitle] = useState({
        title: [],
        loading: true
    });

    const [arms, setArm] = useState({
        arm: [],
        loading: true
    });

    const [tiers, setTier] = useState({
        tier: [
            {UNI_TIER: 1},
            {UNI_TIER: 2},
            {UNI_TIER: 3},
            {UNI_TIER: 4},
            {UNI_TIER: 5},
            {UNI_TIER: 6},
            {UNI_TIER: 7}
        ],
        loading: false
    });

    

    const [data, setData] = useState(abyssInitialState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const {
        FLOOR,
        ENEMIES,
        BANNED_CARDS,
        BANNED_TITLES,
        BANNED_ARMS,
        BANNED_UNIVERSES,
        BANNED_TIERS,
        BANNED_PETS,
        TITLE,
        ARM,
        PET,
        SPECIAL_BUFF
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

            axios.get('/crown/pets')
                .then((res) => {
                    setPet({pet: res.data, loading: false})
                })

            axios.get('/crown/titles')
                .then((res) => {
                    setTitle({title: res.data, loading: false})
                })
            
                axios.get('/crown/arms')
                .then((res) => {
                    setArm({arm: res.data, loading: false})
                })
        }
      }, [auth])

    const onChangeHandler = (e) => {
        setShow(false)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    if(!universes.loading) {
        var universeSelector = universes.universe.map(universe => {
            return {
                value: universe.TITLE, label: `${universe.TITLE}`
            }
        })
    
        var bannedUniverseHandler = (e) => {
            if(e != null){
                let value = e
                const uniList = [];
                for(const uni of value){
                    if(!data.BANNED_UNIVERSES.includes(uni)){
                        uniList.push(uni.value)
                    }
                }
                if(uniList){
                    setData({
                        ...data,
                        BANNED_UNIVERSES: uniList,
                    })
                }
                
            }
        }
            
    }

    if(!tiers.loading) {
        var tierSelector = tiers.tier.map(tier => {
            return {
                value: tier.UNI_TIER, label: `${tier.UNI_TIER}`
            }
        })
    
        var tierHandler = (e) => {
            if(e != null){
                let value = e
                const tierList = [];
                for(const ti of value){
                    if(!data.BANNED_TIERS.includes(ti)){
                        tierList.push(ti.value)
                    }
                }
                if(tierList){
                    setData({
                        ...data,
                        BANNED_TIERS: tierList,
                    })
                }
                
            }
        }
            
    }

    if(!pets.loading) {
        var petSelector = pets.pet.map(pet => {
            return {
                value: pet.PET, label: `${pet.PET}`
            }
        })
    
        var enemyPetHandler = (e) => {
            let value = e[0]
            pets.pet.map(pet => {
                if (e.value === pet.PET) {
                    setData({
                        ...data,
                        PET: pet.PET,
                    })
                }
            })
        }

        var bannedPetHandler = (e) => {
            if(e != null){
                let value = e
                const petList = [];
                for(const p of value){
                    if(!data.BANNED_PETS.includes(p)){
                        petList.push(p.value)
                    }
                }
                if(petList){
                    setData({
                        ...data,
                        BANNED_PETS: petList,
                    })
                }
                
            }
        }
    }

    if(!titles.loading) {
        var titleSelector = titles.title.map(title => {
            return {
                value: title.TITLE, label: `${title.TITLE}`
            }
        })
    
        var enemyTitleHandler = (e) => {
            let value = e[0]
            titles.title.map(title => {
                if (e.value === title.TITLE) {
                    setData({
                        ...data,
                        TITLE: title.TITLE,
                    })
                }
            })
        }

        var bannedTitleHandler = (e) => {
            if(e != null){
                let value = e
                const titleList = [];
                for(const t of value){
                    if(!data.BANNED_TITLES.includes(t)){
                        titleList.push(t.value)
                    }
                }
                if(titleList){
                    setData({
                        ...data,
                        BANNED_TITLES: titleList,
                    })
                }
                
            }
        }
    }

    if(!arms.loading) {
        var armSelector = arms.arm.map(arm => {
            return {
                value: arm.ARM, label: `${arm.ARM}`
            }
        })
    
        var enemyArmHandler = (e) => {
            let value = e[0]
            arms.arm.map(arm => {
                if (e.value === arm.ARM) {
                    setData({
                        ...data,
                        ARM: arm.ARM,
                    })
                }
            })
        }

        var bannedArmHandler = (e) => {
            if(e != null){
                let value = e
                const armList = [];
                for(const a of value){
                    if(!data.BANNED_ARMS.includes(a)){
                        armList.push(a.value)
                    }
                }
                if(armList){
                    setData({
                        ...data,
                        BANNED_ARMS: armList,
                    })
                }
                
            }
        }
    }

    if(!cards.loading) {
        var cardSelector = cards.card.map(card => {
            return {
                value: card.NAME, label: `${card.NAME}`
            }
        })

        var enemyHandler = (e) => {
            if(e != null){
                let value = e
                const enemyList = [];
                for(const e of value){
                    if(!data.ENEMIES.includes(e)){
                        enemyList.push(e.value)
                    }
                }
                if(enemyList){
                    setData({
                        ...data,
                        ENEMIES: enemyList,
                    })
                }
                
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

            const res = await saveAbyss(data)

            setData(abyssInitialState)
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
                        New Crown Unlimited Abyss
                    </h3>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="card">
                            <div className="card-body">
                                <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                                    <Form.Row>

                                        <Form.Group as={Col} md="2" controlId="validationCustom02">
                                            <Form.Label>Floor</Form.Label>
                                            <Form.Control
                                                value={FLOOR}
                                                onChange={onChangeHandler}
                                                name="FLOOR"
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>Abyss Title</Form.Label>
                                            <Select
                                                onChange={enemyTitleHandler}
                                                options={titleSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>Abyss Arm</Form.Label>
                                            <Select
                                                onChange={enemyArmHandler}
                                                options={armSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="3" controlId="validationCustom01">
                                            <Form.Label>Abyss Pet</Form.Label>
                                            <Select
                                                onChange={enemyPetHandler}
                                                options={petSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="1" controlId="validationCustom02">
                                            <Form.Label>Special Buff</Form.Label>
                                            <Form.Control
                                                value={SPECIAL_BUFF}
                                                onChange={onChangeHandler}
                                                name="SPECIAL_BUFF"
                                                required
                                                type="number"

                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Universes</Form.Label>
                                            <Select
                                                onChange={bannedUniverseHandler}
                                                isMulti
                                                
                                                options={universeSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Card Tiers</Form.Label>
                                            <Select
                                                onChange={tierHandler}
                                                isMulti
                                                options={tierSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Titles</Form.Label>
                                            <Select
                                                onChange={bannedTitleHandler}
                                                isMulti
                                                
                                                options={titleSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Arms</Form.Label>
                                            <Select
                                                onChange={bannedArmHandler}
                                                isMulti
                                                options={armSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Cards</Form.Label>
                                            <Select
                                                onChange={bannedCardsHandler}
                                                isMulti
                                                
                                                options={cardSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                                            <Form.Label>Banned Pets</Form.Label>
                                            <Select
                                                onChange={bannedPetHandler}
                                                isMulti
                                                options={petSelector}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                styles={styleSheet}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                        
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                                            <Form.Label>Abyss Enemies</Form.Label>
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

                                    <Button type="submit">Create Abyss</Button>
                                    {/* <br />
                                    <br />
                                    <Link to="/updateabyss"><Button variant="warning">Update Abyss</Button></Link> 
                                    <br/>
                                    <br /> */}
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
    titles: state.titles
})

export default connect(mapStateToProps, {saveAbyss})(NewAbyss)
