import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminPage from "./pages/admin-page";

import "./app.scss";

function AdminApp(): JSX.Element {
    return (
        <React.Fragment>
            <h1 className="a-mainHeading">Hannibal-Five</h1>
            <Router>
                <Switch>
                    <Route path="/admin/app" component={AdminPage} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default AdminApp;

if (document.getElementById("react-adminapp")) {
    ReactDOM.render(<AdminApp />, document.getElementById("react-adminapp"));
}
