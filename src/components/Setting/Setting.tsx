import React, { useId } from "react";
import "./style.css";

interface SettingProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    label: string;
}

export const Setting: React.FC<SettingProps> = ({ label, ...other }) => {
    const id = useId();

    return (
        <div className='Setting'>
            <label className='Setting__label' htmlFor={id}>
                {label}
            </label>
            <input className='Setting__input' id={id} type='text' {...other} />
        </div>
    );
};
