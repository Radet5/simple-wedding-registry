import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegistryPage from "./pages/registry-page";
import UserReservationsPage from "./pages/user-reservations-page";

import "./app.scss";

function App(): JSX.Element {
    return (
        <React.Fragment>
            <h1 className="a-mainHeading">Hannibal-Five</h1>
            <Router>
                <Switch>
                    <Route
                        path="/reservation/:email"
                        component={UserReservationsPage}
                    />
                    <Route path="/" component={RegistryPage} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;

if (document.getElementById("react-app")) {
    ReactDOM.render(<App />, document.getElementById("react-app"));
}
