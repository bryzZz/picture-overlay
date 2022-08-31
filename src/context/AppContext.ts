import { createCtx } from "../utils";

interface AppContextState {
    imgData: string;
    setImgData: (imgData: string) => void;
}

export const [useAppContext, AppContextProvider] = createCtx<AppContextState>();
