import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Card_Widget = ({data}) => {
    const {loading, user} = data;
    const [card, setCard] = useState({
        card: {},
        loading: true
    })
    useEffect(() => {
        if(!loading){
            axios.get(`/crown/cards/${user.data.CARD}`)
                .then((res) => {
                    setCard({card: res, loading: false})
                })
        }
    }, [])

    return loading || card.loading ? <div></div> : (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card  card-statistics">
                <img className="card-img" src={card.card.data.PATH}/>
                <div className="card-body">
                    <div className="clearfix">
                        <h3 className="card-title">{user.data.CARD}</h3>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                        <i className="mdi mdi-sword mr-1" aria-hidden="true"></i>Health: {card.card.data.HLT} 
                        <br/>
                        <i className="mdi mdi-sword mr-1" aria-hidden="true"></i>Stamina: {card.card.data.STAM}
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

export default connect(mapStateToProps)(Card_Widget)
