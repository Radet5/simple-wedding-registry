import React from "react";

import "./form-text-area.scss";

interface FormTextAreaProps {
    name: string;
    id: string;
    value: string;
    label: string;
    error?: string;
    onChange: (event) => void;
}

const FormTextArea = (props: FormTextAreaProps): JSX.Element => {
    const inputClassName = props.error
        ? "m-formTextArea__input -error"
        : "m-formTextArea__input";
    return (
        <React.Fragment>
            <label className="m-formTextArea__label" htmlFor={props.id}>
                {props.label}
            </label>
            <textarea
                name={props.name}
                id={props.id}
                className={inputClassName}
                onChange={props.onChange}
                value={props.value}
            />
            {props.error ? (
                <p className="m-formTextArea__validation-error">
                    {props.error}
                </p>
            ) : null}
        </React.Fragment>
    );
};
export default FormTextArea;
