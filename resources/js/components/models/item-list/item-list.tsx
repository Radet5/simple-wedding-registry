import React from "react";
import Item from "./item/item";
import ItemInterface from "./item/item-interface";

import "./item-list.scss";

interface Filters {
    key: string;
    operation: string;
    parameter?: string;
}

interface ItemListInterface {
    items: Array<ItemInterface>;
    filters: Array<Filters>;
    control: (props) => JSX.Element;
}

const filter = (item, filters) => {
    let passes = true;
    if (filters) {
        filters.forEach((filter) => {
            switch (filter.operation) {
                case "null":
                    if (!(item[filter.key] === null)) {
                        passes = false;
                    }
                    break;
                case "notnull":
                    if (item[filter.key] === null) {
                        passes = false;
                    }
                    break;
            }
        });
    }
    return passes;
};

const ItemList = (props: ItemListInterface): JSX.Element => {
    return (
        <div className="itemList">
            {props.items
                .filter((item) => filter(item, props.filters))
                .map((item) => {
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
