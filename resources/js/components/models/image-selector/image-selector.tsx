import React, { useEffect, useState } from "react";

import "./image-selector.scss";

interface ImageSelectorProps {
    file: string;
    onSelectFile: (file) => void;
}

const ImageSelector = (props: ImageSelectorProps): JSX.Element => {
    useEffect(() => {
        if (props.file) {
            setPreview(URL.createObjectURL(props.file));
        } else {
            setPreview("");
        }
    }, [props.file]);
    const [preview, setPreview] = useState("");

    const selectFile = (event) => {
        props.onSelectFile(event.target.files[0]);
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
