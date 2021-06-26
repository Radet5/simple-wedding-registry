import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegistryPage from "./pages/registry-page";
import UserReservationsPage from "./pages/user-reservations-page";

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route
                    path="/reservation/:email"
                    component={UserReservationsPage}
                />
                <Route path="/" component={RegistryPage} />
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById("react-app")) {
    ReactDOM.render(<App />, document.getElementById("react-app"));
}
