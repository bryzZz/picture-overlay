import { useCallback, useState } from "react";
import { Coords, SelectOption, Size } from "../types";
import { createImage, getFilename } from "../utils";

export const useSettings = () => {
    const [mainImg, setMainImg] = useState<HTMLImageElement | null>(null);
    const [mainImgSize, setMainImgSize] = useState<Size>({
        width: 0,
        height: 0,
    });
    const [overlayImg, setOverlayImg] = useState<HTMLImageElement | null>(null);
    const [overlayImgSize, setOverlayImgSize] = useState<Size>({
        width: 0,
        height: 0,
    });
    const [scale, setScale] = useState<number>(100);
    const [opacity, setOpacity] = useState<number>(100);
    const [angle, setAngle] = useState<number>(0);
    const [position, setPosition] = useState<Coords>({ x: 0, y: 0 });
    const [filename, setFilename] = useState<string>("");

    const handleChangeMainImg = async (imgData: string, name?: string) => {
        const img = await createImage(imgData);
        setMainImgSize({ width: img.width, height: img.height });
        setMainImg(img);
        setFilename(name ? getFilename(name) : "download");
    };

    const handleChangeOverlayImg = async (imgData: string) => {
        const img = await createImage(imgData);
        setOverlayImgSize({ width: img.width, height: img.height });
        setOverlayImg(img);
    };

    const handleChangeScale = useCallback(
        (value: number) => {
            setScale(value);
            // Also change position when change scale because we need
            // an illusion like overlay picture change scale from center
            setPosition(({ x, y }) => {
                const pW = overlayImgSize.width * (scale / 100),
                    pH = overlayImgSize.height * (scale / 100),
                    nW = overlayImgSize.width * (value / 100),
                    nH = overlayImgSize.height * (value / 100);

                let newX = x + (pW - nW) / 2,
                    newY = y + (pH - nH) / 2;

                if (nW > pW) {
                    newX = x - (nW - pW) / 2;
                    newY = y - (nH - pH) / 2;
                }

                return { x: Math.round(newX), y: Math.round(newY) };
            });
        },
        [overlayImgSize]
    );

    const handleChangeOffsetX = useCallback((value: number) => {
        setPosition((p) => ({ ...p, x: value }));
    }, []);

    const handleChangeOffsetY = useCallback((value: number) => {
        setPosition((p) => ({ ...p, y: value }));
    }, []);

    const handleChangePosition = useCallback(
        (option: SelectOption) => {
            let { x, y } = position;

            if (option.value === "left") {
                x = 0;
            } else if (option.value === "right") {
                x = mainImgSize.width - overlayImgSize.width;
            } else if (option.value === "top") {
                y = 0;
            } else if (option.value === "bottom") {
                y = mainImgSize.height - overlayImgSize.height;
            } else if (option.value === "hCenter") {
                x =
                    (mainImgSize.width - overlayImgSize.width * (scale / 100)) /
                    2;
            } else if (option.value === "vCenter") {
                y =
                    (mainImgSize.height -
                        overlayImgSize.height * (scale / 100)) /
                    2;
            }

            setPosition({ x: Math.floor(x), y: Math.floor(y) });
        },
        [position, mainImgSize, overlayImgSize, scale]
    );

    return {
        mainImg,
        overlayImg,
        mainImgSize,
        overlayImgSize,
        scale,
        opacity,
        angle,
        position,
        filename,
        handleChangeMainImg,
        handleChangeOverlayImg,
        handleChangeScale,
        handleChangeOpacity: setOpacity,
        handleChangeAngle: setAngle,
        handleChangeFilename: setFilename,
        handleChangePosition,
        handleChangeOffsetX,
        handleChangeOffsetY,
    };
};
