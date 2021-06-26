import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ItemList from "../models/item-list/item-list";
import Modal from "../models/modal/modal";
import Popup from "../models/popup/popup";
import BoughtForm from "../models/bought-form/bought-form";

const ItemControl = (items, setItems) => {
    return function ReservationControl(props) {
        const [displayPopup, setDisplayPopup] = useState(false);
        const reservationData = {
            firstName: props.reservation.first_name,
            lastName: props.reservation.last_name,
            email: props.reservation.email,
        };

        const togglePopup = () => {
            console.log("toggle popup", props.id);
            setDisplayPopup(!displayPopup);
        };

        const deleteReservation = (reservationId, itemId, items, setItems) => {
            axios
                .delete(`/api/v1/reservations/${reservationId}`)
                .then((res) => {
                    console.log("Deleted reservation");
                    console.log(res);
                    const remainingItems = items.filter((item) => {
                        return item.id != itemId;
                    });
                    setItems(remainingItems);
                })
                .catch((error) => console.error(error));
        };

        const submit = () => {
            console.log("Bought");
            deleteReservation(props.reservation.id, props.id, items, setItems);
        };

        return (
            <div>
                <button onClick={togglePopup}>I bought this</button>
                <button
                    onClick={() =>
                        deleteReservation(
                            props.reservation.id,
                            props.id,
                            items,
                            setItems
                        )
                    }
                >
                    Cancel Reservation
                </button>
                {displayPopup ? (
                    <Modal>
                        <Popup title="Bought it" onClose={togglePopup}>
                            <BoughtForm
                                id={props.id}
                                initialValues={reservationData}
                                onSubmit={submit}
                            ></BoughtForm>
                        </Popup>
                    </Modal>
                ) : null}
            </div>
        );
    };
};

const UserReservationsPage = (): JSX.Element => {
    const [items, setItems] = useState([]);
    const { email } = useParams();
    useEffect(() => {
        axios.get(`/api/v1/reservations/${email}`).then((res) => {
            console.log(res);
            console.log(res.data);
            setItems(res.data.items);
        });
        console.log(email);
    }, [email]);
    return (
        <React.Fragment>
            <div>Reservations for {email}</div>
            <ItemList items={items} control={ItemControl(items, setItems)} />
        </React.Fragment>
    );
};

export default UserReservationsPage;
