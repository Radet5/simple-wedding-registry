import React, { useState } from "react";
import axios from "axios";

import FormInput from "../form-input/form-input";
import SubmitButton from "../button/submit-button/submit-button";

import "./reserve-form.scss";

interface ReserveFormProps {
    id: number;
    onSubmit: () => void;
}

const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
};

const ReserveForm = (props: ReserveFormProps): JSX.Element => {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});

    const updateForm = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValues({ ...values, [name]: value });
    };

    const submit = (event) => {
        event.preventDefault();
        console.log("submit");
        const formD = new FormData();
        Object.keys(values).forEach((key) => {
            formD.append(key, values[key]);
        });
        formD.append("itemId", props.id.toString());
        axios
            .post("/api/v1/reservations", formD, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                props.onSubmit();
            })
            .catch((exception) => {
                if (exception.response.status == 422) {
                    console.log(exception.response);
                    console.log(exception.response.data.errors);
                    setErrors(exception.response.data.errors);
                }
            });
    };

    return (
        <React.Fragment>
            <form className="o-reserveForm">
                <FormInput
                    id="first-name"
                    value={values["firstName"]}
                    name="firstName"
                    type="text"
                    onChange={updateForm}
                    label="First Name*"
                    error={errors["firstName"]}
                />
                <FormInput
                    id="last-name"
                    value={values["lastName"]}
                    name="lastName"
                    type="text"
                    onChange={updateForm}
                    label="Last Name*"
                    error={errors["lastName"]}
                />
                <FormInput
                    id="email"
                    value={values["email"]}
                    name="email"
                    type="email"
                    onChange={updateForm}
                    label="Email*"
                    error={errors["email"]}
                />
                <SubmitButton onClick={submit} />
            </form>
        </React.Fragment>
    );
};

export default ReserveForm;
