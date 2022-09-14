import React from "react";
import { store } from "../../store";
import { positions } from "../../constants";
import { Setting } from "../Setting/Setting";
import { observer } from "mobx-react-lite";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = observer(() => {
    return (
        <>
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
