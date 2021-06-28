import React, { useState } from "react";
import axios from "axios";
import ImageSelector from "../image-selector/image-selector";

import FormInput from "../form-input/form-input";
import FormTextArea from "../form-text-area/form-text-area";
import SubmitButton from "../button/submit-button/submit-button";

import "./add-item-form.scss";

interface AddItemFormProps {
    onSubmit: () => void;
    edit?: boolean;
    initialValues?: {
        id: number;
        name: string;
        url: string;
        description: string;
        price: string;
    };
}

const defaultValues = {
    name: "",
    price: "",
    description: "",
    url: "",
};

const AddItemForm = (props: AddItemFormProps): JSX.Element => {
    const [values, setValues] = useState({
        ...defaultValues,
        ...props.initialValues,
    });
    const [picture, setPicture] = useState("");
    const [errors, setErrors] = useState({});

    const updateForm = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValues({ ...values, [name]: value });
    };

    const editItem = (formD, itemId) => {
        formD.append("_method", "put");
        axios
            .post(`/api/v1/items/${itemId}`, formD, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                props.onSubmit();
                setValues(defaultValues);
                setPicture("");
            })
            .catch((exception) => {
                if (exception.response.status == 422) {
                    console.log(exception.response);
                    console.log(exception.response.data.errors);
                    setErrors(exception.response.data.errors);
                }
            });
    };
    const addItem = (formD) => {
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
            })
            .catch((exception) => {
                if (exception.response.status == 422) {
                    console.log(exception.response);
                    console.log(exception.response.data.errors);
                    setErrors(exception.response.data.errors);
                }
            });
    };

    const submit = (event) => {
        event.preventDefault();
        console.log("submit");
        const formD = new FormData();
        Object.keys(values).forEach((key) => {
            formD.append(key, values[key]);
        });
        formD.append("image", picture);
        if (props.edit) {
            if (!props.initialValues) {
                console.error("Initial values undefined in edit mode");
                return false;
            }
            editItem(formD, props.initialValues.id);
        } else {
            addItem(formD);
        }
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
                error={errors["name"]}
            />
            <FormInput
                id="item-price"
                value={values["price"]}
                name="price"
                type="number"
                onChange={updateForm}
                label="Item Price"
                error={errors["price"]}
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
            <ImageSelector file={picture} onSelectFile={setPicture} />
            <SubmitButton onClick={submit} />
        </form>
    );
};

export default AddItemForm;
