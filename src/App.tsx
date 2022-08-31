import React, { useRef } from "react";
import { Preview } from "./components/Preview/Preview";
import { Upload } from "./components/Upload/Upload";
import { useUploadStore } from "./store/useAppStore";

export const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {
        firstImgData,
        secondImgData,
        scale,
        opacity,
        angle,
        position,
        setFirstImgData,
        setSecondImgData,
        setScale,
        setOpacity,
        setAngle,
        setPosition,
    } = useUploadStore();

    const handleGetImage = () => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = canvasRef.current!.toDataURL();
        link.click();
    };

    const handleChangeScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScale(+e.target.value);
    };

    const handleChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpacity(+e.target.value);
    };

    const handleChangeAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAngle(+e.target.value);
    };

    const handleChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition({ ...position, [e.target.name]: +e.target.value });
    };

    return (
        <div className='App'>
            <div className='container App__container'>
                <div className='App__side'>
                    {!firstImgData && <Upload setImgData={setFirstImgData} />}
                    {firstImgData && <Preview canvasRef={canvasRef} />}
                </div>
                <div className='App__side'>
                    {!secondImgData && <Upload setImgData={setSecondImgData} />}
                    <label>
                        Scale:
                        <input
                            type='text'
                            value={scale}
                            onChange={handleChangeScale}
                        />
                    </label>
                    <label>
                        Opacity:
                        <input
                            type='text'
                            value={opacity}
                            onChange={handleChangeOpacity}
                        />
                    </label>
                    <label>
                        Angle:
                        <input
                            type='text'
                            value={angle}
                            onChange={handleChangeAngle}
                        />
                    </label>
                    <label>
                        Position x:
                        <input
                            type='text'
                            name='x'
                            value={position.x}
                            onChange={handleChangePosition}
                        />
                    </label>
                    <label>
                        Position y:
                        <input
                            type='text'
                            name='y'
                            value={position.y}
                            onChange={handleChangePosition}
                        />
                    </label>
                    <button onClick={handleGetImage}>Get Image</button>
                </div>
            </div>
        </div>
    );
};
