import React, { useRef, useState } from "react";
import { Header, Preview, Setting, Upload } from "./components";
import { createImage } from "./utils";
import { Boundaries, Coords } from "./types";

const positions: Setting.Option[] = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Horizontal Center", value: "hCenter" },
    { label: "Vertical Center", value: "vCenter" },
];

export const App: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [mainImgData, setMainImgData] = useState<string>("");
    const [mainImg, setMainImg] = useState<HTMLImageElement | null>(null);
    const [mainImgBoundaries, setMainImgBoundaries] = useState<Boundaries>({
        width: 0,
        height: 0,
    });
    // const [overlayImgData, setOverlayImgData] = useState<string>("");
    const [overlayImg, setOverlayImg] = useState<HTMLImageElement | null>(null);
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

    const handleChangeMainImg = async (imgData: string) => {
        const img = await createImage(imgData);
        setMainImgBoundaries({ width: img.width, height: img.height });
        setMainImg(img);
    };

    const handleChangeOverlayImg = async (imgData: string) => {
        const img = await createImage(imgData);
        setOverlayImgBoundaries({ width: img.width, height: img.height });
        setOverlayImg(img);
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

    const handleChangePosition = (option: Setting.Option) => {
        let { x, y } = position;

        if (option.value === "left") {
            x = 0;
        } else if (option.value === "right") {
            x = mainImgBoundaries.width - overlayImgBoundaries.width;
        } else if (option.value === "top") {
            y = 0;
        } else if (option.value === "bottom") {
            y = mainImgBoundaries.height - overlayImgBoundaries.height;
        } else if (option.value === "hCenter") {
            x = (mainImgBoundaries.width - overlayImgBoundaries.width) / 2;
        } else if (option.value === "vCenter") {
            y = (mainImgBoundaries.height - overlayImgBoundaries.height) / 2;
        }

        setPosition({ x, y });
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
                    {!mainImg && (
                        <Upload onChangeImgData={handleChangeMainImg} />
                    )}
                    {mainImg && (
                        <Preview
                            canvasRef={canvasRef}
                            mainImg={mainImg}
                            overlayImg={overlayImg || new Image()}
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
                    {!overlayImg && (
                        <Upload onChangeImgData={handleChangeOverlayImg} />
                    )}
                    <Setting.Input
                        label='Scale:'
                        value={scale}
                        min={0}
                        max={300}
                        onChange={handleChangeScale}
                    />
                    <Setting.Input
                        label='Opacity:'
                        value={opacity}
                        min={0}
                        max={100}
                        onChange={handleChangeOpacity}
                    />
                    <Setting.Input
                        label='Angle:'
                        value={angle}
                        min={-180}
                        max={180}
                        onChange={handleChangeAngle}
                    />
                    <Setting.Select
                        label='Position:'
                        defaultValue={positions[0]}
                        options={positions}
                        onChange={handleChangePosition}
                    />
                    <Setting.Input
                        label='Offset x:'
                        min={minXOffset}
                        max={maxXOffset}
                        value={position.x}
                        onChange={handleChangeOffsetX}
                    />
                    <Setting.Input
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
