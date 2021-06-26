import React from "react";

import "./popup.scss";

interface PopupProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Popup = (props: PopupProps): JSX.Element => {
    return (
        <div className="o-popup">
            <div className="o-popup__title">{props.title}</div>
            {props.children}
            <button onClick={props.onClose}>Close</button>
        </div>
    );
};

export default Popup;
