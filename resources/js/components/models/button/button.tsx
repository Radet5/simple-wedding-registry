import React from "react";

import "./button.scss";

interface Props {
    children: React.ReactNode;
    modifiers?: Array<string>;
    onClick: (event) => void;
}

const Button = (props: Props): JSX.Element => {
    const buttonClass = props.modifiers
        ? `a-button ${props.modifiers
              .map((modifier) => `-${modifier}`)
              .join(" ")}`
        : "a-button";
    return (
        <button onClick={props.onClick} className={buttonClass}>
            {props.children}
        </button>
    );
};

export default Button;
