import React, { useState } from "react";

import ReserveForm from "../reserve-form/reserve-form";
import BoughtForm from "../bought-form/bought-form";
import Popup from "../popup/popup";

import "./gift-popup.scss";

interface GiftPopupProps {
    id: number;
    name: string;
    onClose: () => void;
}

const GiftPopup = (props: GiftPopupProps): JSX.Element => {
    const [questionName, setQuestionName] = useState("bought?");

    const didntBoughtIt = (e) => {
        e.preventDefault();
        setQuestionName("reserve?");
    };

    const boughtIt = (e) => {
        e.preventDefault();
        setQuestionName("where?");
    };

    const reserveIt = (e) => {
        e.preventDefault();
        setQuestionName("contact?");
    };

    const dontReserveIt = (e) => {
        e.preventDefault();
        props.onClose();
    };

    const questions = {
        "bought?": (
            <div className="o-giftPopup__control">
                <div className="o-giftPopup__prompt">
                    Have you purchased {props.name}?
                </div>
                <button onClick={boughtIt}>Yes</button>
                <button onClick={didntBoughtIt}>No</button>
            </div>
        ),
        "where?": (
            <div className="o-giftPopup__control">
                <div className="o-giftPopup__prompt">
                    <p>Thank you!</p>
                    <BoughtForm
                        id={props.id}
                        onSubmit={() => console.log("submitting boughtform")}
                    />
                </div>
            </div>
        ),
        "reserve?": (
            <div className="o-giftPopup__control">
                <div className="o-giftPopup__prompt">
                    <p>
                        Please wait to mark this item as purchased until you
                        have completed the transaction.
                    </p>
                    <p>
                        However, you may mark it as reserved in the registry for
                        up to one week while you are in the process of
                        purchasing it.
                    </p>
                    <p>Would you like to reserve this gift?</p>
                    <button onClick={reserveIt}>Yes</button>
                    <button onClick={dontReserveIt}>No</button>
                </div>
            </div>
        ),
        "contact?": (
            <div className="o-giftPopup__control">
                <div className="o-giftPopup__prompt">
                    <p>
                        Once you have successfully submitted the form below this
                        item will be reserved in our registry for one week. If
                        you purchase the item in that time period please return
                        to this site and let us know that you have bought it
                        either by using the link we will email to you or by
                        clicking the button at the top of the page and entering
                        the same email that you provide below.
                    </p>
                    <p>
                        Please note that this does not mean the item is reserved
                        at any store; just that it will not appear on our
                        registry list during the time which is it still marked
                        as reserved.
                    </p>
                    <p>Thank you!</p>
                    <ReserveForm
                        id={props.id}
                        onSubmit={() => console.log("submitting boughtform")}
                    />
                </div>
            </div>
        ),
    };

    return (
        <Popup title={props.name} onClose={props.onClose}>
            {questions[questionName]}
        </Popup>
    );
};

export default GiftPopup;
