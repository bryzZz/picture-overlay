import React, { memo, useId } from "react";
import { Range, getTrackBackground } from "react-range";
import "./style.css";

interface SettingProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export const Setting: React.FC<SettingProps> = memo(
    ({ label, value, min, max, onChange }) => {
        const id = useId();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(+e.target.value);
        };

        return (
            <div className='Setting'>
                <label className='Setting__label' htmlFor={id}>
                    {label}
                </label>
                <input
                    className='Setting__input'
                    id={id}
                    type='number'
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                />
                <input
                    type='range'
                    min={min}
                    max={max}
                    step={1}
                    value={value}
                    onChange={handleChange}
                />
                {/* <Range
                    step={1}
                    values={[value]}
                    min={min}
                    max={max}
                    onChange={(values) => onChange(values[0])}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                                maxWidth: "180px",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "5px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: [value],
                                        colors: [
                                            "var(--color-primary)",
                                            "var(--color-tertiary)",
                                        ],
                                        min: min,
                                        max: max,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "2.5rem",
                                width: "2.5rem",
                                borderRadius: "2px",
                                backgroundColor: "var(--color-secondary)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                outline: "none",
                            }}
                        >
                            <div
                                style={{
                                    height: "1rem",
                                    width: "0.3rem",
                                    backgroundColor: isDragged
                                        ? "var(--color-primary)"
                                        : "var(--color-tertiary)",
                                }}
                            />
                        </div>
                    )}
                /> */}
            </div>
        );
    }
);
