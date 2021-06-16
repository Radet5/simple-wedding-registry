import React, { useState } from "react";
import axios from "axios";
import ImageSelector from "../image-selector/image-selector";

import FormInput from "../form-input/form-input";
import FormTextArea from "../form-text-area/form-text-area";

import "./add-item-form.scss";

interface AddItemFormProps {
    onSubmit: () => void;
    onClose: () => void;
}

const defaultValues = {
    name: "",
    price: "",
    description: "",
    url: "",
};

const AddItemForm = (props: AddItemFormProps): JSX.Element => {
    const [values, setValues] = useState(defaultValues);
    const [picture, setPicture] = useState("");

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
        formD.append("image", picture);
        axios
            .post("/api/v1/items", formD, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                props.onSubmit();
                setValues(defaultValues);
                setPicture("");
            });
    };

    const close = (event) => {
        event.preventDefault();
        props.onClose();
    };

    return (
        <form className="o-addItemForm">
            <FormInput
                id="item-name"
                value={values["name"]}
                name="name"
                type="text"
                onChange={updateForm}
                label="Item Name"
            />
            <FormInput
                id="item-price"
                value={values["price"]}
                name="price"
                type="number"
                onChange={updateForm}
                label="Item Price"
            />
            <FormInput
                id="item-url"
                value={values["url"]}
                name="url"
                type="text"
                onChange={updateForm}
                label="Item Link"
            />
            <FormTextArea
                id="item-description"
                value={values["description"]}
                name="description"
                onChange={updateForm}
                label="Item Description (optional)"
            />
            <ImageSelector onSelectFile={setPicture} />
            <input
                className="o-addItemForm__submitButton"
                type="submit"
                onClick={submit}
            />
            <button className="o-addItemForm__closeButton" onClick={close}>
                Close
            </button>
        </form>
    );
};

export default AddItemForm;
