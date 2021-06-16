import React from "react";
import Item from "./item/item";
import ItemInterface from "./item/item-interface";

import "./item-list.scss";

interface ItemListInterface {
    items: Array<ItemInterface>;
    control: (props) => JSX.Element;
}

const ItemList = (props: ItemListInterface): JSX.Element => {
    return (
        <div className="itemList">
            {props.items.map((item) => {
                return (
                    <div
                        key={`itemContainer-${item.id}`}
                        className="itemList__itemContainer"
                    >
                        <Item
                            key={`item-${item.id}`}
                            item={item}
                            control={props.control}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ItemList;
