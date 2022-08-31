import React, { useState } from "react";
import { readImage } from "../../utils";
import "./style.css";

interface UploadProps {
    setImgData: (imgData: string) => void;
}

export const Upload: React.FC<UploadProps> = ({ setImgData }) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;
        const result = await readImage(e.target.files[0]);
        if (!(result instanceof ArrayBuffer) && result) setImgData(result);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        const f = e.dataTransfer;
        if (f.files === null) return;
        const result = await readImage(f.files[0]);
        if (!(result instanceof ArrayBuffer) && result) setImgData(result);
    };

    return (
        <div className={"Upload" + (isDragOver ? " dragover" : "")}>
            <span className='Upload__label'>Drag&drop here</span>
            <input
                className='Upload__input'
                onChange={handleChange}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                type='file'
                accept='image/*'
            />
        </div>
    );
};
