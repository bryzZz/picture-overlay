import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Coords } from "../types";

interface UploadState {
    mainImgData: string;
    overlayImgData: string;
    scale: number;
    opacity: number;
    angle: number;
    position: Coords;
    setMainImgData: (imgData: string) => void;
    setOverlayImgData: (imgData: string) => void;
    setScale: (scale: number) => void;
    setOpacity: (opacity: number) => void;
    setAngle: (angle: number) => void;
    setPosition: (position: Coords) => void;
}

export const useUploadStore = create<UploadState>()(
    persist(
        devtools((set) => ({
            mainImgData: "",
            overlayImgData: "",
            scale: 100,
            opacity: 100,
            angle: 0,
            position: { x: 0, y: 0 },
            setMainImgData: (mainImgData) =>
                set(() => ({ mainImgData }), false, "setMainImgData"),
            setOverlayImgData: (overlayImgData) =>
                set(() => ({ overlayImgData }), false, "setOverlayImgData"),
            setScale: (scale) => set(() => ({ scale }), false, "setScale"),
            setOpacity: (opacity) =>
                set(() => ({ opacity }), false, "setOpacity"),
            setAngle: (angle) => set(() => ({ angle }), false, "setAngle"),
            setPosition: (position) =>
                set(() => ({ position }), false, "setPosition"),
        })),
        { name: "picture-overlay" }
    )
);
