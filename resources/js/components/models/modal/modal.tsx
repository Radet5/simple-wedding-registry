import React from "react";

interface ModalProps {
    children: JSX.Element;
}

const Modal = (props: ModalProps): JSX.Element => {
    return (
        <React.Fragment>
            <div
                style={{
                    position: "fixed",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    right: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                }}
            >
                <div
                    style={{
                        margin: "15% auto",
                        width: "fit-content",
                        backgroundColor: "white",
                        borderRadius: "8px",
                    }}
                >
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
