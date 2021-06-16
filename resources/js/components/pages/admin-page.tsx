import React, { useEffect, useState } from "react";
import axios from "axios";

import ItemList from "../models/item-list/item-list";

const AdminPage = (props) => {
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
            <div onClick={() => props.history.push("add-item")}>Add Item</div>
            <ItemList items={items} />
        </div>
    );
};

export default AdminPage;
