import React from "react";

import Modal from "../modal/modal";
import Button from "../button/button";

import "./popup.scss";

interface PopupProps {
    title: string;
    children: React.ReactNode;
    onClose: (event) => void;
}

const Popup = (props: PopupProps): JSX.Element => {
    return (
        <Modal>
            <div className="o-popup">
                <div className="o-popup__title">{props.title}</div>
                {props.children}
                <div className="o-popup__closeButtonContainer">
                    <Button onClick={props.onClose}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};

export default Popup;
