import { memo } from "react";

interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    width: number;
    height: number;
}

export const Canvas: React.FC<CanvasProps> = memo(
    ({ canvasRef, width, height }) => {
        return <canvas ref={canvasRef} width={width} height={height} />;
    }
);
