import React, { useState } from "react";
import History from "history";

import Popup from "../popup/popup";
import FormInput from "../form-input/form-input";
import Button from "../button/button";

import "./see-reservations.scss";

interface Props {
    history: History;
}

const SeeReservations = (props: Props): JSX.Element => {
    const [displayForm, setDisplayForm] = useState(false);
    const [values, setValues] = useState({ email: "" });

    const openForm = (e) => {
        e.preventDefault();
        setDisplayForm(true);
    };

    const closeForm = (e?) => {
        e.preventDefault();
        setDisplayForm(false);
    };

    const updateForm = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValues({ ...values, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        props.history.push(`reservation/${values["email"]}`);
    };

    return (
        <React.Fragment>
            <div className="a-seeReservations__buttonContainer">
                <Button onClick={openForm} modifiers={["accent"]}>
                    My Reserved Items
                </Button>
            </div>
            {displayForm ? (
                <Popup onClose={closeForm} title="See Reservations">
                    <form className="a-seeReservations__emailForm">
                        <FormInput
                            type="email"
                            id="email"
                            name="email"
                            value={values["email"]}
                            onChange={updateForm}
                            label="Email"
                        />
                        <input type="submit" onClick={submit} />
                    </form>
                </Popup>
            ) : null}
        </React.Fragment>
    );
};

export default SeeReservations;
