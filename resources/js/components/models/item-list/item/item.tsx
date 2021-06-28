import React from "react";

import ItemInterface from "./item-interface";

import "./item.scss";

interface ItemProps {
    item: ItemInterface;
    control: (props) => JSX.Element;
}

const Item = (props: ItemProps): JSX.Element => {
    const { item } = props;
    return (
        <div key={`item`} className="m-item">
            <div className="m-item__info">
                <div className="m-item__name">{item.name}</div>
                <div className="m-item__price">{`$${item.price}`}</div>
                {item.public_img_path ? (
                    <img
                        className="m-item__img"
                        src={`${item.public_img_path}`}
                    />
                ) : null}
                {item.description ? (
                    <div className="m-item__description">{`${item.description}`}</div>
                ) : null}
                <a href={`http://${item.url}`} className="m-item__link">
                    {item.url}
                </a>
                <props.control
                    className="m-item__control"
                    id={item.id}
                    name={item.name}
                    reservation={item.reservation}
                />
            </div>
        </div>
    );
};

export default Item;
