import React, { useEffect } from "react";
import { Boundaries, Coords } from "../../types";
import { drawImage } from "../../utils";
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

        // main image
        drawImage(ctx, mainImg, 0, 0);

        // draw overlay image
        let { width, height } = overlayImgBoundaries;
        const { x, y } = position;
        scale = scale / 100;
        opacity = opacity / 100;
        width = width * scale;
        height = height * scale;

        drawImage(ctx, overlayImg, x, y, {
            width,
            height,
            opacity,
            angle,
        });
    }, [mainImg, overlayImg, scale, opacity, angle, position]);

    const { width, height } = mainImgBoundaries;
    return (
        <div className='Preview'>
            <Canvas canvasRef={canvasRef} width={width} height={height} />
        </div>
    );
};
