import React from "react";

import Modal from "../modal/modal";

import "./popup.scss";

interface PopupProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Popup = (props: PopupProps): JSX.Element => {
    return (
        <Modal>
            <div className="o-popup">
                <div className="o-popup__title">{props.title}</div>
                {props.children}
                <button onClick={props.onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default Popup;
