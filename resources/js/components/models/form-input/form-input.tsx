import React from "react";

const FormInput = (props) => {
    const inputClassName = props.error
        ? "m-formInput__input -error"
        : "m-formInput__input";
    return (
        <React.Fragment>
            <label className="m-formInput__label" htmlFor={props.id}>
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                className={inputClassName}
                value={props.value}
                onChange={props.onChange}
            />
            {props.error ? (
                <p className="m-formInput__validation-error">{props.error}</p>
            ) : null}
        </React.Fragment>
    );
};
export default FormInput;
