import React, { useEffect } from "react";
import { useAppContext } from "../../context";
import { drawImage } from "../../utils";
import { Canvas } from "./Canvas";
import "./style.css";

interface PreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Preview: React.FC<PreviewProps> = ({ canvasRef }) => {
    const {
        mainImg,
        overlayImg,
        mainImgSize,
        overlayImgSize,
        scale,
        opacity,
        angle,
        position,
    } = useAppContext();

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        // main image
        if (!mainImg) return;
        drawImage(ctx, mainImg, 0, 0);

        // draw overlay image
        if (!overlayImg) return;

        let { width, height } = overlayImgSize;
        const { x, y } = position,
            scale_ = scale / 100,
            opacity_ = opacity / 100;
        width = width * scale_;
        height = height * scale_;

        drawImage(ctx, overlayImg, x, y, {
            width,
            height,
            opacity: opacity_,
            angle,
        });
    }, [mainImg, overlayImg, scale, opacity, angle, position]);

    const { width, height } = mainImgSize;
    return (
        <div className='Preview'>
            <Canvas canvasRef={canvasRef} width={width} height={height} />
        </div>
    );
};
