import React, { memo } from "react";
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

    export const Input: React.FC<InputProps> = memo(
        ({ label, value, min, max, onChange }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(+e.target.value);
            };

            return (
                <div className='Setting'>
                    <label className='Setting__label'>
                        {label}
                        <input
                            className='Setting__input'
                            type='number'
                            min={min}
                            max={max}
                            value={value}
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        className='Setting__range'
                        type='range'
                        min={min}
                        max={max}
                        step={1}
                        value={value}
                        onChange={handleChange}
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
            <div className='Setting Setting--select'>
                <label className='Setting__label'>
                    {label}
                    <ReactSelect
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        options={options}
                        className='Setting-select-container'
                        classNamePrefix='Setting-select'
                    />
                </label>
            </div>
        );
    };
}
