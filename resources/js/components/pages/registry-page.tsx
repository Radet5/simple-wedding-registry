import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemList from "../models/item-list/item-list";

const RegistryPage = () => {
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
            <ItemList items={items} />
        </div>
    );
};

export default RegistryPage;
