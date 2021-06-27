import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import History from "history";

import ItemList from "../models/item-list/item-list";
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
                    <Popup title="Bought it" onClose={togglePopup}>
                        <BoughtForm
                            id={props.id}
                            initialValues={reservationData}
                            onSubmit={submit}
                        ></BoughtForm>
                    </Popup>
                ) : null}
            </div>
        );
    };
};

interface Props {
    history: History;
}
const UserReservationsPage = (props: Props): JSX.Element => {
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

    const back = (e) => {
        e.preventDefault();
        props.history.push("/");
    };

    return (
        <React.Fragment>
            <div>Reservations for {email}</div>
            <ItemList items={items} control={ItemControl(items, setItems)} />
            {items.length == 0 ? (
                <p>
                    Sorry no items were found reserved for this email address.
                    If it has been more than a week the reservation has expired,
                    otherwise be sure you entered your email address correctly.
                </p>
            ) : null}
            <button onClick={back}>Back</button>
        </React.Fragment>
    );
};

export default UserReservationsPage;
