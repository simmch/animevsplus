import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { login } from "../../actions/auth/auth";
import logo from '../../assets/images/pcg_logo.png'
// import Alert from "../alerts/alerts";
import Spinner from "../isLoading/spinner";

const Login = ({ login, auth, history }) => {

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/')
    }
  }, [auth])

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  }

  return auth.isAuthenticated ? (
    <Spinner />
  ) : (
      <div>
        <div className="d-flex align-items-center login-card auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-8 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img
                    src={logo}
                    alt="logo"
                  />
                </div>
                <h4>Party Chat Gaming</h4>
                <h6 className="font-weight-light">Log in to continue.</h6>
                <Form className="pt-3" onSubmit={onSubmit}>
                  <div className="mt-3">
                    <button
                      type="submit"
                      value="login"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN IN
                  </button>
                  </div>
                  {/* CREATE AN ACCOUNT DISABLED BY CLIENT REQUEST */}
                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Create
                  </Link>
                  </div> */}
                </Form>
              </div>
              {/* <Alert /> */}
            </div>

          </div>
        </div>

      </div>
    );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
