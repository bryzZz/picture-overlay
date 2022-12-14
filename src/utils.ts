import { createContext, useContext } from "react";
import { FilePromise } from "./types";

export function createCtx<A extends {} | null>() {
    const ctx = createContext<A | undefined>(undefined);
    function useCtx() {
        const c = useContext(ctx);
        if (c === undefined) throw new Error("useCtx must be inside a Provider with a value");
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

export function createImage(src: string) {
    const image = new Image();
    image.src = src;
    return new Promise<HTMLImageElement>((res, rej) => {
        image.onload = () => res(image);
        image.onerror = (err) => rej(err);
    });
}

type DrawImageOpts = {
    width?: number;
    height?: number;
    angle?: number;
    opacity?: number;
};

export function drawImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    opts?: DrawImageOpts
) {
    if (opts) {
        let { width, height, angle, opacity } = opts;
        if (width === undefined) width = img.width;
        if (height === undefined) height = img.height;

        if (opacity) ctx.globalAlpha = opacity;
        if (angle) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, x + width / 2, y + height / 2);
            ctx.rotate(angle * (Math.PI / 180));
            ctx.drawImage(img, -width / 2, -height / 2, width, height);
            ctx.restore();
        } else {
            ctx.drawImage(img, x, y, width, height);
        }
    } else {
        ctx.drawImage(img, x, y);
    }
}

export function getFilename(file: string) {
    return file.slice(0, file.lastIndexOf("."));
}
