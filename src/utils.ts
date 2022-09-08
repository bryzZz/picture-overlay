import { FilePromise } from "./types";

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
