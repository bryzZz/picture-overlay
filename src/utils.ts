import { createContext, useContext } from "react";
import { FilePromise } from "./types";

export function createCtx<A extends {} | null>() {
    const ctx = createContext<A | undefined>(undefined);
    function useCtx() {
        const c = useContext(ctx);
        if (c === undefined)
            throw new Error("useCtx must be inside a Provider with a value");
        return c;
    }
    return [useCtx, ctx.Provider] as const;
}

export function readImage(image: File) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return new Promise<FilePromise>((res, rej) => {
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
    });
}

function createImage(src: string) {
    const image = new Image();
    image.src = src;
    return new Promise<HTMLImageElement>((res, rej) => {
        image.onload = () => res(image);
        image.onerror = (err) => rej(err);
    });
}

export async function getImageData(src: string, scale: number = 1) {
    const image = await createImage(src);

    const width = image.width * scale;
    const height = image.height * scale;
    return new Promise<ImageData>((res) => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(image, 0, 0, width, height);
        res(ctx.getImageData(0, 0, width, height));
    });
}
