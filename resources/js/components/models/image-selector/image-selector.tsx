import React, { useState } from "react";

import "./image-selector.scss";

interface ImageSelectorProps {
    onSelectFile: (file) => void;
}

const ImageSelector = (props: ImageSelectorProps): JSX.Element => {
    const [preview, setPreview] = useState("");

    const selectFile = (event) => {
        props.onSelectFile(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <React.Fragment>
            <label
                className="m-imageSelector__label"
                htmlFor="m-imageSelector__input"
            >
                Item Image
            </label>
            <img className="m-imageSelector__previewImage" src={preview} />
            <input
                id="m-imageSelector__input"
                className="m-imageSelector__input"
                type="file"
                accept="image/*"
                onChange={selectFile}
            />
        </React.Fragment>
    );
};

export default ImageSelector;
