import React, { useEffect } from "react";
import { useUploadStore } from "../../store/useAppStore";
import "./style.css";

interface PreviewProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Preview: React.FC<PreviewProps> = ({ canvasRef }) => {
    const [
        mainImgData,
        mainImgBoundaries,
        overlayImgData,
        scale,
        opacity,
        angle,
        position,
    ] = useUploadStore((state) => [
        state.mainImgData,
        state.mainImgBoundaries,
        state.overlayImgData,
        state.scale,
        state.opacity,
        state.angle,
        state.position,
    ]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, 3104, 1356);

        const image = new Image();
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
        };
        image.src = mainImgData;

        const image_ = new Image();
        image_.onload = () => {
            const width = image_.width;
            const height = image_.height;
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
                image_,
                position.x,
                position.y,
                width * (scale / 100),
                height * (scale / 100)
            );
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();
        };
        image_.src = overlayImgData;
    }, [mainImgData, overlayImgData, scale, opacity, angle, position]);

    return (
        <div className='Preview'>
            <canvas
                ref={canvasRef}
                width={mainImgBoundaries.width}
                height={mainImgBoundaries.height}
            />
        </div>
    );
};
