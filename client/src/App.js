import store from './store';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth/auth"; 
import { Provider } from 'react-redux';
import Login from './components/auth/login';
import Landing from './components/landing/landing';
import Navbar from './components/navigation/navbar';
import Sidebar from './components/navigation/sidebar';
import NewCard from './components/cards/newcard';
import UpdateCard from './components/cards/updatecard';
import UpdateArm from './components/arms/updatearm';
import NewArm from './components/arms/newarm';
import NewUniverse from './components/universe/newuniverse';
import UpdateUniverse from './components/universe/updateuniverse';
import NewScenario from './components/scenario/newscenario';
import UpdateScenario from './components/scenario/updatescenario';
import UpdateTitle from './components/titles/updatetitle';
import NewTitle from './components/titles/newtitle';
import NewAbyss from './components/abyss/newabyss';
import UpdateAbyss from './components/abyss/updateabyss';
import UpdatePet from './components/pets/updatepet';
import NewPet from './components/pets/newpet';
import logo from './logo.svg';
import './App.scss';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>

        <Fragment>
          <section className="container-scroller">

            <Route component={Sidebar} />
            <div className="container-fluid page-body-wrapper">
              <Route component={Navbar} />

              <div className="main-panel">
                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/newcard" component={NewCard} />
                    <Route exact path="/updatecards" component={UpdateCard} />
                    <Route exact path="/newarm" component={NewArm} />
                    <Route exact path="/updatearms" component={UpdateArm} />
                    <Route exact path="/newabyss" component={NewAbyss} />
                    <Route exact path="/updateabyss" component={UpdateAbyss} />
                    <Route exact path="/newuniverse" component={NewUniverse} />
                    <Route exact path="/updateuniverse" component={UpdateUniverse} />
                    <Route exact path="/newscenario" component={NewScenario} />
                    <Route exact path="/updatescenario" component={UpdateScenario} />
                    <Route exact path="/newtitle" component={NewTitle} />
                    <Route exact path="/updatetitles" component={UpdateTitle} />
                    <Route exact path="/newpet" component={NewPet} />
                    <Route exact path="/updatepets" component={UpdatePet} />
                  </Switch>
                </div>
              </div>
            </div>
          </section>

        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
