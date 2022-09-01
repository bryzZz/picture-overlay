import React, { useRef } from "react";
import { Header } from "./components/Header/Header";
import { Preview } from "./components/Preview/Preview";
import { Setting } from "./components/Setting/Setting";
import { Upload } from "./components/Upload/Upload";
import { useUploadStore } from "./store/useAppStore";

export const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const mainImgRef = useRef<HTMLImageElement>(new Image());
    const {
        mainImgData,
        overlayImgData,
        scale,
        opacity,
        angle,
        position,
        setMainImgData,
        setMainImgBoundaries,
        setOverlayImgData,
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

    const handleChangeMainImg = (imgData: string) => {
        const img = new Image();
        img.onload = () => {
            setMainImgBoundaries({ width: img.width, height: img.height });
            setMainImgData(imgData);
        };
        img.src = imgData;
    };

    const handleChangeOverlayImg = (imgData: string) => {
        setOverlayImgData(imgData);
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
            <Header />
            <div className='container App__container'>
                <div className='App__side'>
                    {!mainImgData && (
                        <Upload onChangeImgData={handleChangeMainImg} />
                    )}
                    {mainImgData && <Preview canvasRef={canvasRef} />}
                </div>
                <div className='App__side'>
                    {!overlayImgData && (
                        <Upload onChangeImgData={handleChangeOverlayImg} />
                    )}
                    <Setting
                        label='Scale:'
                        value={scale}
                        onChange={handleChangeScale}
                    />
                    <Setting
                        label='Opacity:'
                        value={opacity}
                        onChange={handleChangeOpacity}
                    />
                    <Setting
                        label='Angle:'
                        value={angle}
                        onChange={handleChangeAngle}
                    />
                    <Setting
                        label='Position:'
                        value={angle}
                        onChange={handleChangeAngle}
                    />
                    <Setting
                        label='Offset x:'
                        name='x'
                        value={position.x}
                        onChange={handleChangePosition}
                    />
                    <Setting
                        label='Offset y:'
                        name='y'
                        value={position.y}
                        onChange={handleChangePosition}
                    />
                    <button onClick={handleGetImage}>Get Image</button>
                </div>
            </div>
        </div>
    );
};
