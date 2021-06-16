import React, { useState } from "react";
import axios from "axios";

import FormInput from "../form-input/form-input";

const defaultValues = {
    name: "",
    price: "",
    description: "",
    url: "",
};

const AddItemForm = () => {
    const [values, setValues] = useState(defaultValues);

    const updateForm = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setValues({ ...values, [name]: value });
    };

    const submit = (event) => {
        event.preventDefault();
        console.log("submit");
        axios.post("/api/v1/items", { values }).then((res) => {
            console.log(res);
            console.log(res.data);
        });
    };

    return (
        <form>
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
            <button onClick={submit}>Submit</button>
        </form>
    );
};

export default AddItemForm;
