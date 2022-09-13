import { Coords, SelectOption, Size } from "../types";
import { createCtx } from "../utils";

interface AppContextState {
    mainImg: HTMLImageElement | null;
    overlayImg: HTMLImageElement | null;
    mainImgSize: Size;
    overlayImgSize: Size;
    scale: number;
    opacity: number;
    angle: number;
    position: Coords;
    filename: string;
    handleChangeMainImg: (imgData: string, name?: string) => Promise<void>;
    handleChangeOverlayImg: (imgData: string) => Promise<void>;
    handleChangeScale: (value: number) => void;
    handleChangeOpacity: (value: number) => void;
    handleChangeAngle: (value: number) => void;
    handleChangeFilename: (value: string) => void;
    handleChangePosition: (option: SelectOption) => void;
    handleChangeOffsetX: (value: number) => void;
    handleChangeOffsetY: (value: number) => void;
}

export const [useAppContext, AppContextProvider] = createCtx<AppContextState>();
