import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Arm_Widget from "../widgets/arm_widget";
import Card_Widget from "../widgets/card_widget";
import Title_Widget from "../widgets/title_widget";
import Pet_Widget from "../widgets/pet_widget";
// import Spinner from "../isLoading/spinner";
// import EmpTable from "../widgets/empTable";
// import EmpSearchTable from "../widgets/empSearchTable";
// import EmpPrimaryData from "../widgets/empPrimaryData";


const Landing = ({ auth, cards, history}) => {

  const [editButton, setEditButton] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    editButton ? setEditButton(false) : setEditButton(true)

  }

  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push('/login')
    }
  }, [auth])



  return (
      <div>
        <div className="row">
            <Card_Widget data={auth} />
            <Arm_Widget data={auth} />
            <Title_Widget data={auth} />
            <Pet_Widget data={auth} />
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 grid-margin stretch-card">
            <div className="card card-statistics">
              {/* <div className="card-body">
                <button hidden={payroll.loading} onClick={onClickHandler} type="button" className="btn btn-primary btn-rounded btn-icon">
                  <i className="mdi mdi-table-edit"></i>
                </button> Edit Table
                <button hidden={payroll.loading} onClick={onWideModeHandler} type="button" style={{ 'margin-left': '10px' }} className="btn btn-info btn-rounded btn-icon">
                  <i className="mdi mdi-file-excel"></i>
                </button> Enter Wide Mode
              </div> */}
            </div>
          </div>
        </div>
        {/* {!editButton ? <EmpTable /> : <EmpSearchTable />} */}
      </div >
    )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cards: state.cards
});

export default connect(mapStateToProps, {})(withRouter(Landing));
