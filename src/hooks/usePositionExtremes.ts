import { Size } from "../types";

export const usePositionExtremes = (
    mainImgSize: Size,
    overlayImgSize: Size,
    scale: number
) => {
    return {
        maxX: mainImgSize.width,
        minX: Math.floor(-overlayImgSize.width * (scale / 100)),
        maxY: mainImgSize.height,
        minY: Math.floor(-overlayImgSize.height * (scale / 100)),
    };
};
