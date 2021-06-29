import React from "react";

import "./upload-status-msg.scss";

interface UploadStatusMsgProps {
    status: string;
}

const statusMsg = {
    unsubmitted: { classModifier: "", text: "" },
    uploading: { classModifier: "", text: "Uploading" },
    success: { classModifier: "-success", text: "Success!" },
    error: { classModifier: "-error", text: "Error!" },
};

const UploadStatusMsg = (props: UploadStatusMsgProps): JSX.Element => {
    const { classModifier, text } = statusMsg[props.status];

    return (
        <div className={`a-uploadStatusMsg ${classModifier}`}>
            <div className="a-uploadStatusMsg__text">{text}</div>
        </div>
    );
};

export default UploadStatusMsg;
