import React, { useState } from "react";

import "./accordion.scss";

interface AccordionProps {
    text: string;
    children: React.ReactNode;
}

const Accordion = (props: AccordionProps): JSX.Element => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    return (
        <div className="m-accordion">
            <div className="m-accordion__bar">
                <div
                    onClick={toggleAccordion}
                    className="m-accordion__bar__text"
                >
                    {props.text}
                </div>
            </div>
            <div className="m-accordion__contents">
                {accordionOpen ? props.children : null}
            </div>
        </div>
    );
};

export default Accordion;
