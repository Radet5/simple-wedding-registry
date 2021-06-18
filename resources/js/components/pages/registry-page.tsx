import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemList from "../models/item-list/item-list";
import Modal from "../models/modal/modal";
import GiftPopup from "../models/gift-popup/gift-popup";

const RegistryItemControl = (props) => {
    const [displayGiftPopup, setDisplayGiftPopup] = useState(false);

    const toggleGiftPopup = () => {
        console.log("buy", props.id);
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

const RegistryPage = (): JSX.Element => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios
            .get(`api/v1/items`)
            .then((res) => {
                console.log(res.data);
                setItems(res.data.items);
            })
            .catch((error) => console.error(error));
    }, []);
    return (
        <div className="pageWrapper">
            <ItemList items={items} control={RegistryItemControl} />
        </div>
    );
};

export default RegistryPage;
