import React, { useEffect, useRef } from "react";
import { store } from "../../store";
import { observer } from "mobx-react-lite";
import { positions } from "../../constants";
import { Setting } from "../Setting/Setting";
import { Button } from "../Button/Button";
import "./style.css";
import { readImage } from "../../utils";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = observer(() => {
    const mainRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if ((e.target as HTMLButtonElement).name === "main") {
            mainRef.current?.click();
        } else {
            overlayRef.current?.click();
        }
    };

    useEffect(() => {
        const main = mainRef.current,
            overlay = overlayRef.current;
        const handleChangeFile = async (file: File, fn: Function) => {
            const result = await readImage(file);
            if (!(result instanceof ArrayBuffer) && result) fn(result, file.name);
        };

        const handleChangeMain = async (e: Event) => {
            if ((e.target! as HTMLInputElement).files === null) return;
            await handleChangeFile(
                (e.target! as HTMLInputElement).files![0],
                store.handleChangeMainImg
            );
        };

        const handleChangeOverlay = async (e: Event) => {
            if ((e.target! as HTMLInputElement).files === null) return;
            await handleChangeFile(
                (e.target! as HTMLInputElement).files![0],
                store.handleChangeOverlayImg
            );
        };

        main!.addEventListener("change", handleChangeMain);
        overlay!.addEventListener("change", handleChangeOverlay);

        return () => {
            main!.removeEventListener("change", handleChangeMain);
            overlay!.removeEventListener("change", handleChangeOverlay);
        };
    }, []);

    return (
        <>
            <div className="Settings__buttons">
                <Button size="small" name="main" onClick={handleClick}>
                    Main image uploaded
                </Button>
                <Button size="small" name="overlay" onClick={handleClick}>
                    Watermark uploaded
                </Button>
                <input ref={mainRef} type="file" hidden />
                <input ref={overlayRef} type="file" hidden />
            </div>
            <Setting.Input
                label="Scale:"
                value={store.scale}
                min={0}
                max={300}
                onChange={store.handleChangeScale}
            />
            <Setting.Input
                label="Opacity:"
                value={store.opacity}
                min={0}
                max={100}
                onChange={store.handleChangeOpacity}
            />
            <Setting.Input
                label="Angle:"
                value={store.angle}
                min={-180}
                max={180}
                onChange={store.handleChangeAngle}
            />
            <Setting.Select
                label="Position:"
                defaultValue={positions[0]}
                options={positions}
                onChange={store.handleChangePosition}
            />
            <Setting.Input
                label="Offset x:"
                min={store.minX}
                max={store.maxX}
                value={store.position.x}
                onChange={store.handleChangeOffsetX}
            />
            <Setting.Input
                label="Offset y:"
                min={store.minY}
                max={store.maxY}
                value={store.position.y}
                onChange={store.handleChangeOffsetY}
            />
            <Setting.Text
                label="Filename: "
                value={store.filename}
                onChange={store.handleChangeFilename}
            />
        </>
    );
});
