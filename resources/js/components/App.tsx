import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RegistryPage from "./pages/registry-page";
import TestPage from "./pages/test-page";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/test" component={TestPage} />
                <Route path="/" component={RegistryPage} />
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById("react-app")) {
    ReactDOM.render(<App />, document.getElementById("react-app"));
}
