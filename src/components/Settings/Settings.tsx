import React, { memo, useEffect } from "react";
import { useAppContext } from "../../context";
import { usePositionExtremes } from "../../hooks";
import { positions } from "../../constants";
import { Setting } from "../Setting/Setting";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
    const {
        mainImgSize,
        overlayImgSize,
        scale,
        opacity,
        angle,
        position,
        filename,
        handleChangeScale,
        handleChangeOpacity,
        handleChangeAngle,
        handleChangePosition,
        handleChangeOffsetX,
        handleChangeOffsetY,
        handleChangeFilename,
    } = useAppContext();

    const { maxX, maxY, minX, minY } = usePositionExtremes(
        mainImgSize,
        overlayImgSize,
        scale
    );

    return (
        <>
            <Setting.Input
                label='Scale:'
                value={scale}
                min={0}
                max={300}
                onChange={handleChangeScale}
            />
            <Setting.Input
                label='Opacity:'
                value={opacity}
                min={0}
                max={100}
                onChange={handleChangeOpacity}
            />
            <Setting.Input
                label='Angle:'
                value={angle}
                min={-180}
                max={180}
                onChange={handleChangeAngle}
            />
            <Setting.Select
                label='Position:'
                defaultValue={positions[0]}
                options={positions}
                onChange={handleChangePosition}
            />
            <Setting.Input
                label='Offset x:'
                min={minX}
                max={maxX}
                value={position.x}
                onChange={handleChangeOffsetX}
            />
            <Setting.Input
                label='Offset y:'
                min={minY}
                max={maxY}
                value={position.y}
                onChange={handleChangeOffsetY}
            />
            <Setting.Text
                label='Filename: '
                value={filename}
                onChange={handleChangeFilename}
            />
        </>
    );
};
