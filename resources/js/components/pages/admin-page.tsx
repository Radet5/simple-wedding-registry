import React, { useEffect, useState } from "react";
import axios from "axios";

import AddItemForm from "../models/add-item-form/add-item-form";
import ItemList from "../models/item-list/item-list";

const apiURL = `api/v1/`;

const ItemControl = (items, setItems) => {
    return function AdminItemControl(props): JSX.Element {
        const editItem = () => {
            console.log("edit", props.id);
        };

        const deleteItem = () => {
            console.log("delete", props.id);
            axios
                .delete(`${apiURL}items/${props.id}`)
                .then((res) => {
                    console.log(res);
                    const remainingItems = items.filter((item) => {
                        return item.id != props.id;
                    });
                    setItems(remainingItems);
                })
                .catch((error) => console.error(error));
        };

        return (
            <div>
                <button onClick={editItem}>edit</button>
                <button onClick={deleteItem}>delete</button>
            </div>
        );
    };
};

const AdminPage = (): JSX.Element => {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [displayAddForm, setDisplayAddForm] = useState(false);

    const fetchItems = () => {
        axios
            .get(`${apiURL}items`)
            .then((res) => {
                console.log(res.data);
                setItems(res.data.items);
            })
            .catch((error) => console.error(error));
    };

    const toggleAddForm = () => {
        setDisplayAddForm(!displayAddForm);
    };

    return (
        <div className="pageWrapper">
            {displayAddForm ? (
                <AddItemForm onSubmit={fetchItems} onClose={toggleAddForm} />
            ) : (
                <div style={{ textAlign: "center" }} onClick={toggleAddForm}>
                    Add Item
                </div>
            )}
            <ItemList control={ItemControl(items, setItems)} items={items} />
        </div>
    );
};

export default AdminPage;
