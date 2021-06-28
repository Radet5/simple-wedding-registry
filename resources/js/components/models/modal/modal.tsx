import React from "react";

import "./modal.scss";

interface ModalProps {
    children: React.ReactNode;
}

const Modal = (props: ModalProps): JSX.Element => {
    return (
        <div className="a-modal__scrim">
            <div className="a-modal__contents">{props.children}</div>
        </div>
    );
};

export default Modal;
