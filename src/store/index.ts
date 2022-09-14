import { makeAutoObservable, runInAction } from "mobx";
import { SelectOption } from "../types";
import { createImage, getFilename } from "../utils";

class Store {
    mainImg: HTMLImageElement | null = null;
    overlayImg: HTMLImageElement | null = null;
    mainImgSize = { width: 0, height: 0 };
    overlayImgSize = { width: 0, height: 0 };
    position = { x: 0, y: 0 };
    scale = 100;
    opacity = 100;
    angle = 0;
    filename = "";

    constructor() {
        makeAutoObservable(this);
    }

    handleChangeMainImg = async (imgData: string, name?: string) => {
        const img = await createImage(imgData);
        runInAction(() => {
            this.mainImg = img;
            this.mainImgSize = { width: img.width, height: img.height };
            this.filename = name ? getFilename(name) : "download";
        });
    };

    handleChangeOverlayImg = async (imgData: string) => {
        const img = await createImage(imgData);
        runInAction(() => {
            this.overlayImg = img;
            this.overlayImgSize = { width: img.width, height: img.height };
        });
    };

    handleChangeScale = (value: number) => {
        this.scale = value;
    };

    handleChangeOpacity = (value: number) => {
        this.opacity = value;
    };

    handleChangeAngle = (value: number) => {
        this.angle = value;
    };

    handleChangeFilename = (value: string) => {
        this.filename = value;
    };

    handleChangeOffsetX = (value: number) => {
        this.position.x = value;
    };

    handleChangeOffsetY = (value: number) => {
        this.position.y = value;
    };

    handleChangePosition = (option: SelectOption) => {
        let { x, y } = this.position;

        if (option.value === "left") {
            x = 0;
        } else if (option.value === "right") {
            x = this.mainImgSize.width - this.overlayImgSize.width;
        } else if (option.value === "top") {
            y = 0;
        } else if (option.value === "bottom") {
            y = this.mainImgSize.height - this.overlayImgSize.height;
        } else if (option.value === "hCenter") {
            x = (this.mainImgSize.width - this.overlayImgSize.width * (this.scale / 100)) / 2;
        } else if (option.value === "vCenter") {
            y = (this.mainImgSize.height - this.overlayImgSize.height * (this.scale / 100)) / 2;
        }

        this.position.x = Math.floor(x);
        this.position.y = Math.floor(y);
    };

    get minX() {
        return Math.floor(-this.overlayImgSize.width * (this.scale / 100));
    }
    get maxX() {
        return this.mainImgSize.width;
    }
    get minY() {
        return Math.floor(-this.overlayImgSize.height * (this.scale / 100));
    }
    get maxY() {
        return this.mainImgSize.height;
    }
}

export const store = new Store();
