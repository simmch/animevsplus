import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Arm_Widget = ({data}) => {
    const {loading, user} = data;
    const [arm, setArm] = useState({
        arm: {},
        loading: true
    })
    useEffect(() => {
        if(!loading){
            axios.get(`/crown/arms/${user.data.ARM}`)
                .then((res) => {
                    setArm({arm: res, loading: false})
                })
        }
    }, [])

    if(!arm.loading){
        var ability = Object.keys(arm.arm.data.ABILITIES[0])[0]
        var infliction = arm.arm.data.ABILITIES[0][ability]
    }
    return loading || arm.loading ? <div></div> : (
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
                <div className="card-body">
                    <h1 className="card-title">ARM</h1>
                    <div className="clearfix">
                        <div className="float-right">
                            <i className="mdi mdi-shield text-danger icon-lg"></i>
                        </div>
                        <div className="float-left">
                            <div className="fluid-container">
                                <h3 className="font-weight-medium text-right mb-0 text-light">{arm.arm.data.ARM}</h3>
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
    arm: state.arms,
    auth: state.auth
})

export default connect(mapStateToProps)(Arm_Widget)
