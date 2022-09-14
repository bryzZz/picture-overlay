import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { store } from "../../store";
import { drawImage } from "../../utils";
import { Canvas } from "./Canvas";
import "./style.css";

interface PreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Preview: React.FC<PreviewProps> = observer(({ canvasRef }) => {
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        // main image
        if (!store.mainImg) return;
        drawImage(ctx, store.mainImg, 0, 0);

        // draw overlay image
        if (!store.overlayImg) return;

        let { width, height } = store.overlayImgSize;
        const { x, y } = store.position,
            scale_ = store.scale / 100,
            opacity_ = store.opacity / 100;
        width = width * scale_;
        height = height * scale_;

        drawImage(ctx, store.overlayImg, x, y, {
            width,
            height,
            opacity: opacity_,
            angle: store.angle,
        });
    }, [
        store.mainImg,
        store.overlayImg,
        store.scale,
        store.opacity,
        store.angle,
        store.position.x,
        store.position.y,
    ]);

    const { width, height } = store.mainImgSize;
    return (
        <div className="Preview">
            <Canvas canvasRef={canvasRef} width={width} height={height} />
        </div>
    );
});
