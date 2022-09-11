import React, { memo, useState } from "react";
import ReactSelect from "react-select";
import "./style.css";

export namespace Setting {
    interface InputProps {
        label: string;
        value: number;
        min: number;
        max: number;
        onChange: (value: number) => void;
    }

    export type Option = { label: string; value: string };
    interface SelectProps {
        label: string;
        defaultValue: Option;
        options: Option[];
        onChange: (value: Option) => void;
    }

    interface TextProps {
        label: string;
        value: string;
        onChange: (value: string) => void;
    }

    export const Input: React.FC<InputProps> = memo(
        ({ label, value, min, max, onChange }) => {
            const [isRangeHover, setIsRangeHover] = useState<boolean>(false);
            const [isRangeActive, setIsRangeActive] = useState<boolean>(false);

            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(+e.target.value);
            };

            const handleMouseEnter = () => {
                setIsRangeHover(true);
            };
            const handleMouseLeave = () => {
                setIsRangeHover(false);
            };
            const handleMouseDown = () => {
                setIsRangeActive(true);
            };
            const handleMouseUp = () => {
                setIsRangeActive(false);
            };

            return (
                <div className='Setting'>
                    <span className='Setting__label'>{label}</span>
                    <input
                        className='Setting__input'
                        type='number'
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleChange}
                    />
                    <input
                        className={`Setting__range ${
                            isRangeHover ? "hover" : ""
                        } ${isRangeActive ? "active" : ""}`}
                        type='range'
                        min={min}
                        max={max}
                        step={1}
                        value={value}
                        onChange={handleChange}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                </div>
            );
        }
    );

    export const Select: React.FC<SelectProps> = ({
        label,
        defaultValue,
        options,
        onChange,
    }) => {
        const handleChange = (option: Option | null) => {
            if (option) onChange(option);
        };

        return (
            <div className='Setting'>
                <span className='Setting__label'>{label}</span>
                <ReactSelect
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    options={options}
                    className='Setting-select-container'
                    classNamePrefix='Setting-select'
                />
            </div>
        );
    };

    export const Text: React.FC<TextProps> = ({ label, value, onChange }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        };

        return (
            <div className='Setting Setting--Text'>
                <span className='Setting__label'>{label}</span>
                <input
                    className='Setting__input'
                    type='text'
                    placeholder='download'
                    value={value}
                    onChange={handleChange}
                />
            </div>
        );
    };
}
