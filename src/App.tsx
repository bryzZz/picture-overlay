import React, { useRef, useState } from "react";
import { Header, Preview, Setting, Upload } from "./components";
import { Boundaries, Coords } from "./types";

export const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mainImgData, setMainImgData] = useState<string>("");
    const [mainImg, setMainImg] = useState<HTMLImageElement>(new Image());
    const [mainImgBoundaries, setMainImgBoundaries] = useState<Boundaries>({
        width: 0,
        height: 0,
    });
    const [overlayImgData, setOverlayImgData] = useState<string>("");
    const [overlayImg, setOverlayImg] = useState<HTMLImageElement>(new Image());
    const [overlayImgBoundaries, setOverlayImgBoundaries] =
        useState<Boundaries>({
            width: 0,
            height: 0,
        });
    const [scale, setScale] = useState<number>(100);
    const [opacity, setOpacity] = useState<number>(100);
    const [angle, setAngle] = useState<number>(0);
    const [position, setPosition] = useState<Coords>({ x: 0, y: 0 });

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
            setMainImg(img);
        };
        img.src = imgData;
    };

    const handleChangeOverlayImg = (imgData: string) => {
        const img = new Image();
        img.onload = () => {
            setOverlayImgBoundaries({ width: img.width, height: img.height });
            setOverlayImgData(imgData);
            setOverlayImg(img);
        };
        img.src = imgData;
    };

    const handleChangeScale = (value: number) => {
        setScale(value);
    };

    const handleChangeOpacity = (value: number) => {
        setOpacity(value);
    };

    const handleChangeAngle = (value: number) => {
        setAngle(value);
    };

    const handleChangeOffsetX = (value: number) => {
        setPosition((p) => ({ ...p, x: value }));
    };

    const handleChangeOffsetY = (value: number) => {
        setPosition((p) => ({ ...p, y: value }));
    };

    const maxXOffset = mainImgBoundaries.width,
        minXOffset = -overlayImgBoundaries.width * (scale / 100),
        maxYOffset = mainImgBoundaries.height,
        minYOffset = -overlayImgBoundaries.height * (scale / 100);

    return (
        <div className='App'>
            <Header />
            <div className='container App__container'>
                <div className='App__side'>
                    {!mainImgData && (
                        <Upload onChangeImgData={handleChangeMainImg} />
                    )}
                    {mainImgData && (
                        <Preview
                            canvasRef={canvasRef}
                            mainImg={mainImg}
                            overlayImg={overlayImg}
                            mainImgBoundaries={mainImgBoundaries}
                            overlayImgBoundaries={overlayImgBoundaries}
                            scale={scale}
                            angle={angle}
                            opacity={opacity}
                            position={position}
                        />
                    )}
                </div>
                <div className='App__side'>
                    {!overlayImgData && (
                        <Upload onChangeImgData={handleChangeOverlayImg} />
                    )}
                    <Setting
                        label='Scale:'
                        value={scale}
                        min={0}
                        max={200}
                        onChange={handleChangeScale}
                    />
                    <Setting
                        label='Opacity:'
                        value={opacity}
                        min={0}
                        max={100}
                        onChange={handleChangeOpacity}
                    />
                    <Setting
                        label='Angle:'
                        value={angle}
                        min={-180}
                        max={180}
                        onChange={handleChangeAngle}
                    />
                    {/* <Setting
                        label='Position:'
                        value={angle}
                        onChange={handleChangeAngle}
                    /> */}
                    <Setting
                        label='Offset x:'
                        min={minXOffset}
                        max={maxXOffset}
                        value={position.x}
                        onChange={handleChangeOffsetX}
                    />
                    <Setting
                        label='Offset y:'
                        min={minYOffset}
                        max={maxYOffset}
                        value={position.y}
                        onChange={handleChangeOffsetY}
                    />
                    <button onClick={handleGetImage}>Get Image</button>
                </div>
            </div>
        </div>
    );
};
