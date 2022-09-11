import React, { useState } from "react";
import { readImage } from "../../utils";
import "./style.css";

interface UploadProps {
    onChangeImgData: (imgData: string, name?: string) => void;
}

export const Upload: React.FC<UploadProps> = ({ onChangeImgData }) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleChangeFile = async (file: File) => {
        const result = await readImage(file);
        if (!(result instanceof ArrayBuffer) && result)
            onChangeImgData(result, file.name);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;
        await handleChangeFile(e.target.files[0]);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files === null) return;
        await handleChangeFile(e.dataTransfer.files[0]);
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
