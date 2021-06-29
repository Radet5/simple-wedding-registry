import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";

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
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    400,
                    800,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        props.onSelectFile(uri);
                    },
                    "blob"
                );
            } catch (err) {
                console.log(err);
            }
        }
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
