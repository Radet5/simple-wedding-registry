import React from "react";

import "./reserve-form.scss";

interface ReserveFormProps {
    id: number;
}

const ReserveForm = (props: ReserveFormProps): JSX.Element => {
    return <div className="o-reserveForm">Reserve {props.id}</div>;
};

export default ReserveForm;
