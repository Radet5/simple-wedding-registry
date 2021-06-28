import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminPage from "./pages/admin-page";
import AddItemPage from "./pages/add-item-page";

import "./app.scss";

function AdminApp(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/admin/app" component={AdminPage} />
                <Route path="/admin/add-item" component={AddItemPage} />
            </Switch>
        </Router>
    );
}

export default AdminApp;

if (document.getElementById("react-adminapp")) {
    ReactDOM.render(<AdminApp />, document.getElementById("react-adminapp"));
}
