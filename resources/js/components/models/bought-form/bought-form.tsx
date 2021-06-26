import React, { useState } from "react";
import axios from "axios";

import FormInput from "../form-input/form-input";
import FormTextArea from "../form-text-area/form-text-area";

import "./bought-form.scss";

interface BoughtFormProps {
    id: number;
    initialValues?: { firstName: string };
    onSubmit: () => void;
}

const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    storeName: "",
    orderNumber: "",
    msg: "",
    address: "",
};

const BoughtForm = (props: BoughtFormProps): JSX.Element => {
    const [values, setValues] = useState({
        ...defaultValues,
        ...props.initialValues,
    });
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
            .post("/api/v1/purchases", formD, {
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
            <form className="o-boughtForm">
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
                <FormTextArea
                    id="address"
                    value={values["address"]}
                    name="address"
                    onChange={updateForm}
                    label="Address*"
                    error={errors["address"]}
                />
                <FormInput
                    id="store-name"
                    value={values["storeName"]}
                    name="storeName"
                    type="text"
                    onChange={updateForm}
                    label="Store purchased from"
                />
                <FormInput
                    id="order-number"
                    value={values["orderNumber"]}
                    name="orderNumber"
                    type="text"
                    onChange={updateForm}
                    label="Order Number (if you have it)"
                />
                <FormTextArea
                    id="msg"
                    value={values["msg"]}
                    name="msg"
                    onChange={updateForm}
                    label="Add a message here if you like"
                />
                <input
                    className="o-addItemForm__submitButton"
                    type="submit"
                    onClick={submit}
                />
            </form>
        </React.Fragment>
    );
};

export default BoughtForm;
