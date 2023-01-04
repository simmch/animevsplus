import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Trans } from "react-i18next";
import { logout } from "../../actions/auth/auth";
import logo from '../../assets/images/pcg_logo.png';

// import PaydateDropdown from "./paydateDropdown/paydateDropdown";
// import PayrollSearch from "./payrollSearch/payrollSearch";


const Navbar = ({ auth, logout, history }) => {
    const { location } = history;
    const toggleOffcanvas = () => {
        document.querySelector(".sidebar-offcanvas").classList.toggle("active");
    }

    useEffect(() => {
        if(!auth.isAuthenticated) {
            history.push("/login")
        }
    }, [])

    //   useEffect(() => {
    //     loadDates();
    //     loadAssociates();
    //   }, [loadDates])


    const logoutUser = (e) => {
        e.preventDefault();
        logout();
    }

    //   let searchHandler = <div></div>;
    //   if (location.pathname === "/") {
    //     searchHandler = <PaydateDropdown />;
    //   } else if (location.pathname === "/employees") {
    //     searchHandler = <PayrollSearch />;
    //   } else {
    //     searchHandler = <div></div>
    //   }

    return !auth.isAuthenticated || !auth.user ? (
        <div></div>
    ) : (
        <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <Link className="navbar-brand brand-logo-mini" to="/">
                <img
                src={logo}
                alt="logo"
                />
            </Link>
            </div>
            <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button
                className="navbar-toggler align-self-center"
                type="button"
                onClick={() => document.body.classList.toggle("sidebar-icon-only")}
            >
                <span className="mdi mdi-menu"></span>
            </button>
            <ul className="navbar-nav w-100">
                {/* {location.pathname === "/employees" ? <PayrollSearch /> : <PaydateDropdown />} */}
                {/* {searchHandler} */}
            </ul>
            <ul className="navbar-nav navbar-nav-right">
                <div as="li" className="nav-item d-none d-lg-block">
                <div as="li" className="nav-item dropdown"></div>
                {/* <div className="nav-link btn btn-success create-new-button no-caret">
                    <Link to="/upload" className="nav-link">  + <Trans>Upload Payroll</Trans> </Link>
                </div> */}
                </div>

                <Dropdown alignRight as="li" className="nav-item">
                <Dropdown.Toggle
                    as="a"
                    className="nav-link cursor-pointer no-caret"
                >
                    <div className="navbar-profile">
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">
                        { auth.isAuthenticated ? <Trans>{auth.user.data.NAME}</Trans> : <span>Default</span>}
                        { auth.isAuthenticated ? <img src={auth.user.data.AVATAR} className="navbar-profile-name profile-pic"></img> : <span></span>}
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                    <Dropdown.Divider />
                    <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                    className="preview-item"
                    >
                    <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger"></i>
                        </div>
                    </div>
                    <div className="preview-item-content">
                        <p className="preview-subject mb-1" onClick={logoutUser}>
                        <Link to="/login" className="nav-link"><Trans>Log Out</Trans></Link>
                        </p>
                    </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />

                </Dropdown.Menu>
                </Dropdown>
            </ul>
            <button
                className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                onClick={toggleOffcanvas}
            >
                <span className="mdi mdi-format-line-spacing"></span>
            </button>
            </div>
        </nav>
        );

    }

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(withRouter(Navbar));