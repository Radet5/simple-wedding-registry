import React, { useEffect, useState } from "react";
import axios from "axios";
import History from "history";

import ItemList from "../models/item-list/item-list";
import GiftPopup from "../models/gift-popup/gift-popup";
import SeeReservations from "../models/see-reservations/see-reservations";
import Button from "../models/button/button";
import Accordion from "../models/accordion/accordion";

const RegistryItemControl = (props) => {
    const [displayGiftPopup, setDisplayGiftPopup] = useState(false);

    const toggleGiftPopup = () => {
        console.log("toggle gift popup", props.id);
        setDisplayGiftPopup(!displayGiftPopup);
    };

    return (
        <div className="m-item__control">
            <div className="m-item__control__buttonContainer">
                <Button
                    onClick={toggleGiftPopup}
                    modifiers={["emphasis", "accent"]}
                >
                    Give
                </Button>
            </div>
            {displayGiftPopup ? (
                <GiftPopup
                    id={props.id}
                    name={props.name}
                    onClose={toggleGiftPopup}
                />
            ) : null}
        </div>
    );
};

const getItemsSSE = (setItems) => {
    const sse = new EventSource(`api/v1/sse-items`, { withCredentials: true });
    sse.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
        setItems(data);
    };
    sse.onerror = (error) => {
        console.error("sse error!");
        console.error(error);
        sse.close();
        getItemsSSE(setItems);
        //return () => sse.close();
    };
};

const getItems = (setItems) => {
    axios
        .get(`/api/v1/items`)
        .then((res) => {
            console.log(res.data);
            setItems(res.data.items);
        })
        .catch((error) => console.error(error));
};

interface Props {
    history: History;
}

const RegistryPage = (props: Props): JSX.Element => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        console.log(process.env.APP_ENV);
        if (process.env.APP_ENV == "local") {
            getItems(setItems);
        } else {
            getItemsSSE(setItems);
        }
        //  setInterval(() => getItems(setItems), 2000);
    }, []);

    return (
        <div className="pageWrapper">
            <SeeReservations history={props.history} />
            <ItemList
                filters={[
                    { key: "purchase", operation: "null" },
                    { key: "reservation", operation: "null" },
                ]}
                items={items}
                control={RegistryItemControl}
            />
            <Accordion text="Reserved">
                <ItemList
                    filters={[
                        { key: "purchase", operation: "null" },
                        { key: "reservation", operation: "notnull" },
                    ]}
                    items={items}
                    control={() => <div></div>}
                />
            </Accordion>
            <Accordion text="Already Purcahsed">
                <ItemList
                    filters={[
                        { key: "purchase", operation: "notnull" },
                        { key: "reservation", operation: "null" },
                    ]}
                    items={items}
                    control={() => <div></div>}
                />
            </Accordion>
        </div>
    );
};

export default RegistryPage;
