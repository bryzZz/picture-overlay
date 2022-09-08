import React, { useEffect } from "react";
import { Boundaries, Coords } from "../../types";
import { Canvas } from "./Canvas";
import "./style.css";

interface PreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    mainImg: HTMLImageElement;
    mainImgBoundaries: Boundaries;
    overlayImg: HTMLImageElement;
    overlayImgBoundaries: Boundaries;
    scale: number;
    opacity: number;
    angle: number;
    position: Coords;
}

export const Preview: React.FC<PreviewProps> = ({
    canvasRef,
    mainImg,
    overlayImg,
    mainImgBoundaries,
    overlayImgBoundaries,
    scale,
    opacity,
    angle,
    position,
}) => {
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        ctx.drawImage(mainImg, 0, 0);

        const { width, height } = overlayImgBoundaries;
        ctx.save();
        ctx.globalAlpha = opacity / 100;
        ctx.translate(
            (width * (scale / 100)) / 2,
            (height * (scale / 100)) / 2
        );
        ctx.rotate(angle * (Math.PI / 180));
        ctx.translate(
            -(width * (scale / 100)) / 2,
            -(height * (scale / 100)) / 2
        );
        ctx.drawImage(
            overlayImg,
            position.x,
            position.y,
            width * (scale / 100),
            height * (scale / 100)
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.restore();
    }, [mainImg, overlayImg, scale, opacity, angle, position]);

    const { width, height } = mainImgBoundaries;
    return (
        <div className='Preview'>
            <Canvas canvasRef={canvasRef} width={width} height={height} />
        </div>
    );
};
