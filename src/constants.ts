import { SelectOption } from "./types";

export const positions: Readonly<SelectOption[]> = [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Horizontal Center", value: "hCenter" },
    { label: "Vertical Center", value: "vCenter" },
] as const;
