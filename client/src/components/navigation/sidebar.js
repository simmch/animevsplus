import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { logout } from '../../actions/auth/auth';
import logo from '../../assets/images/pcg_logo.png';


const Sidebar = (props) => {
  const { auth } = props;

  const [menuState, setMenuState] = useState({});


  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(menuState).forEach((i) => {
      setMenuState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
      { path: "/editors", state: "editorsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setMenuState({ [obj.state]: true });
      }
    });
  };

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (auth.user) {
      onRouteChanged();
      // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
      const body = document.querySelector("body");
      document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
        el.addEventListener("mouseover", function () {
          if (body.classList.contains("sidebar-icon-only")) {
            el.classList.add("hover-open");
          }
        });
        el.addEventListener("mouseout", function () {
          if (body.classList.contains("sidebar-icon-only")) {
            el.classList.remove("hover-open");
          }
        });
      });
    }

  }, []);

  useEffect(() => {
    if (auth.user) {
      if (props.location.pathname !== props.history.location.pathname) {
        onRouteChanged();
      }
    }

  }, []);



  return !auth.isAuthenticated || !auth.user ? (
    <div></div>
  ) : (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/">
           Party Chat Gaming
          </a>
          <a className="sidebar-brand brand-logo-mini" href="/">
            <img
              src={logo}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">
                  {auth.isAuthenticated ? <Trans>{auth.user.data.NAME}</Trans> : <span>Default</span>}
                </h5>
                <span>
                  <Trans>Welcome Back!</Trans>
                </span>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Navigation</Trans>
            </span>
          </li>
          <li
            className={
              isPathActive("/")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Profile</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              isPathActive("/search")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/search">
              <span className="menu-icon">
                <i className="mdi mdi-upload"></i>
              </span>
              <span className="menu-title">Search</span>
            </Link>
          </li>

          <li
            className={
              isPathActive("/cards")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/cards">
              <span className="menu-icon">
                <i className="mdi mdi-account"></i>
              </span>
              <span className="menu-title">
                <Trans>Cards</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              isPathActive("/titles")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/titles">
              <span className="menu-icon">
                <i className="mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title">
                <Trans>Titles</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              isPathActive("/arms")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/arms">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>Arms</Trans>
              </span>
            </Link>
          </li>

          <li
            className={
              isPathActive("/pets")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/pets">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>Pets</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              isPathActive("/teams")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/teams">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>Teams</Trans>
              </span>
            </Link>
          </li>
          
          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newcard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newcard">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Card</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newpet")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newpet">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Pet</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newarm")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newarm">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Arm</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newtitle")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newtitle">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Title</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newuniverse")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newuniverse">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Universe</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newabyss")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newabyss">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Abyss</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}

          {auth.user.data.IS_ADMIN ? 
          <li
            className={
              isPathActive("/newscenario")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/newscenario">
              <span className="menu-icon">
                <i className="mdi mdi-new-box"></i>
              </span>
              <span className="menu-title">
                <Trans>New Scenario</Trans>
              </span>
            </Link>
          </li> 
          : <span></span>}


        </ul>
      </nav>
    );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Sidebar));