import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../models/modal/modal";
import AddItemForm from "../models/add-item-form/add-item-form";
import ItemList from "../models/item-list/item-list";
import Popup from "../models/popup/popup";
import Button from "../models/button/button";

const apiURL = `/api/v1/`;

const ItemControl = (items, setItems, fetchItems) => {
    return function AdminItemControl(props): JSX.Element {
        const [displayEditForm, setDisplayEditForm] = useState(false);
        const [displayDeleteConfirmation, setDisplayDeleteConfirmation] =
            useState(false);
        //const [csrf, setcsrf] = useState<Element | null>(null);

        //useEffect(() => {
        //    const token = document.head.querySelector('meta[name="csrf-token"]');
        //    console.log("crsf",token?.getAttribute('content'));
        //    setcsrf(token);
        //}, [])

        const toggleEditForm = (e) => {
            e.preventDefault();
            console.log("edit", props.id);
            setDisplayEditForm(!displayEditForm);
        };

        const toggleDeleteConfimation = (e) => {
            e.preventDefault();
            setDisplayDeleteConfirmation(!displayDeleteConfirmation);
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
            <div className="m-item__control">
                <div className="m-item__control__buttonContainer">
                    <div
                        style={{
                            display: "flex",
                            width: "fit-content",
                            margin: "0 auto 0 0",
                            gap: "5px",
                        }}
                    >
                        <Button onClick={toggleDeleteConfimation}>
                            delete
                        </Button>
                        <Button onClick={toggleEditForm}>edit</Button>
                    </div>
                </div>
                {displayDeleteConfirmation ? (
                    <Modal>
                        <Popup
                            title="Are you sure?"
                            onClose={toggleDeleteConfimation}
                        >
                            <div
                                style={{
                                    width: "fit-content",
                                    margin: "0 0 0 auto",
                                }}
                            >
                                <Button
                                    onClick={deleteItem}
                                    modifiers={["accent"]}
                                >
                                    Yes
                                </Button>
                            </div>
                        </Popup>
                    </Modal>
                ) : null}
                {displayEditForm ? (
                    <Modal>
                        <Popup title="Edit" onClose={toggleEditForm}>
                            <AddItemForm
                                onSubmit={fetchItems}
                                edit={true}
                                initialValues={
                                    items.filter(
                                        (item) => item.id == props.id
                                    )[0]
                                }
                            />
                        </Popup>
                    </Modal>
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
                <Modal>
                    <Popup title="Add" onClose={toggleAddForm}>
                        <AddItemForm onSubmit={fetchItems} />
                    </Popup>
                </Modal>
            ) : (
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                    <Button onClick={toggleAddForm} modifiers={["accent"]}>
                        Add Item
                    </Button>
                </div>
            )}
            <ItemList
                control={ItemControl(items, setItems, fetchItems)}
                filters={[]}
                items={items}
            />
        </div>
    );
};

export default AdminPage;
