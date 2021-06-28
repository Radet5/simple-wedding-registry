import React from "react";

import "./submit-button.scss";

interface Props {
    onClick: (event) => void;
}

const SubmitButton = (props: Props): JSX.Element => {
    return (
        <input
            className="a-submitButton"
            type="submit"
            onClick={props.onClick}
        />
    );
};

export default SubmitButton;
