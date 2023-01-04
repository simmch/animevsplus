import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Pet_Widget = ({data}) => {
    const {loading, user} = data;
    const [pet, setPet] = useState({
        pet: {},
        loading: true
    })
    useEffect(() => {
        if(!loading){
            let disname = user.data.DISNAME;
            let updated_disname = disname.replace("#", "%23");
            axios.get(`/crown/vault/${updated_disname}`)
                .then((res) => {
                    setPet({pet: res, loading: false})
                })
        }
    }, [])

    if(!pet.loading){
        var petList = pet.pet.data.PETS;
        var selectedPet;
        for (let pet in petList) {
            if(petList[pet]["NAME"] == user.data.PET){
                selectedPet = petList[pet]
            }
        }
        var ability = Object.keys(selectedPet)[3]
        var infliction = Object.values(selectedPet)[3]
        var power = (selectedPet.LVL * selectedPet.BOND) + infliction
    }
    return loading || pet.loading ? <div></div> : (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card  card-statistics">
                <img className="card-img" src={selectedPet.PATH}/>
                <div className="card-body">
                    <div className="clearfix">
                        <h3 className="card-title">{user.data.PET}</h3>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                        <i className="mdi mdi-sword mr-1" aria-hidden="true"></i>Level: {selectedPet.LVL} 
                        <br/>
                        <i className="mdi mdi-heart mr-1" aria-hidden="true"></i>Bond: {selectedPet.BOND}
                        <br/>
                        <i className="mdi mdi-heart mr-1" aria-hidden="true"></i>{ability} / {power}
                    </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    card: state.cards,
    auth: state.auth
})

export default connect(mapStateToProps)(Pet_Widget)
