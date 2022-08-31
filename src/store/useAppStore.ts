import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Coords } from "../types";

interface UploadState {
    firstImgData: string;
    secondImgData: string;
    scale: number;
    opacity: number;
    angle: number;
    position: Coords;
    setFirstImgData: (imgData: string) => void;
    setSecondImgData: (imgData: string) => void;
    setScale: (scale: number) => void;
    setOpacity: (opacity: number) => void;
    setAngle: (angle: number) => void;
    setPosition: (position: Coords) => void;
}

export const useUploadStore = create<UploadState>()(
    persist(
        devtools((set) => ({
            firstImgData: "",
            secondImgData: "",
            scale: 100,
            opacity: 100,
            angle: 0,
            position: { x: 0, y: 0 },
            setFirstImgData: (firstImgData) =>
                set(() => ({ firstImgData }), false, "setFirstImgData"),
            setSecondImgData: (secondImgData) =>
                set(() => ({ secondImgData }), false, "setSecondImgData"),
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
