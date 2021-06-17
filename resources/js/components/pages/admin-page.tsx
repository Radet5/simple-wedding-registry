import React, { useEffect, useState } from "react";
import axios from "axios";

import AddItemForm from "../models/add-item-form/add-item-form";
import ItemList from "../models/item-list/item-list";

const apiURL = `api/v1/`;

const ItemControl = (items, setItems) => {
    return function AdminItemControl(props): JSX.Element {
        const [displayEditForm, setDisplayEditForm] = useState(false);

        const editItem = () => {
            console.log("edit", props.id);
            setDisplayEditForm(!displayEditForm);
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
                {displayEditForm ? (
                    <div
                        style={{
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            right: "0",
                            backgroundColor: "rgba(0, 0, 0, 0.75",
                        }}
                    >
                        <div
                            style={{
                                margin: "25% auto",
                                width: "fit-content",
                                backgroundColor: "white",
                                borderRadius: "8px",
                            }}
                        >
                            <AddItemForm
                                onSubmit={() => console.log("Submit")}
                                onClose={editItem}
                            />
                        </div>
                    </div>
                ) : null}
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
