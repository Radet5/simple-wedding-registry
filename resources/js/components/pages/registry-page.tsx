import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemList from "../models/item-list/item-list";
import Modal from "../models/modal/modal";
import GiftPopup from "../models/gift-popup/gift-popup";

const RegistryItemControl = (props) => {
    const [displayGiftPopup, setDisplayGiftPopup] = useState(false);

    const toggleGiftPopup = () => {
        console.log("toggle gift popup", props.id);
        setDisplayGiftPopup(!displayGiftPopup);
    };

    return (
        <div>
            <button onClick={toggleGiftPopup}>I want to give this!</button>
            {displayGiftPopup ? (
                <Modal>
                    <GiftPopup
                        id={props.id}
                        name={props.name}
                        onClose={toggleGiftPopup}
                    />
                </Modal>
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
        .get(`api/v1/items`)
        .then((res) => {
            console.log(res.data);
            setItems(res.data.items);
        })
        .catch((error) => console.error(error));
};

const RegistryPage = (): JSX.Element => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        getItemsSSE(setItems);
        //  setInterval(() => getItems(setItems), 2000);
    }, []);

    return (
        <div className="pageWrapper">
            <ItemList
                filters={[{ key: "purchase", operation: "null" }]}
                items={items}
                control={RegistryItemControl}
            />
            <div>Already Purcahsed:</div>
            <ItemList
                filters={[{ key: "purchase", operation: "notnull" }]}
                items={items}
                control={() => <div></div>}
            />
        </div>
    );
};

export default RegistryPage;
