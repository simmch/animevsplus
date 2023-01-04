import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Title_Widget = ({data}) => {
    const {loading, user} = data;
    const [title, settitle] = useState({
        title: {},
        loading: true
    })
    useEffect(() => {
        if(!loading){
            axios.get(`/crown/titles/${user.data.TITLE}`)
                .then((res) => {
                    settitle({title: res, loading: false})
                })
        }
    }, [])

    if(!title.loading){
        var ability = Object.keys(title.title.data.ABILITIES[0])[0]
        var infliction = title.title.data.ABILITIES[0][ability]
    }
    return loading || title.loading ? <div></div> : (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
                <div className="card-body">
                    <h1 className="card-title">TITLE</h1>
                    <div className="clearfix">
                        <div className="float-right">
                            <i className="mdi mdi-crown text-warning icon-lg"></i>
                        </div>
                        <div className="float-left">
                            <div className="fluid-container">
                                <h3 className="font-weight-medium text-right mb-0 text-light">{title.title.data.TITLE}</h3>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                        <i className="mdi mdi-sword mr-1" aria-hidden="true"></i>
                        {ability} / {infliction}
                        </p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.titles,
    auth: state.auth
})

export default connect(mapStateToProps)(Title_Widget)
