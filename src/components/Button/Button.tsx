import React from "react";
import "./style.css";

interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    size?: "small" | "normal";
}

export const Button: React.FC<ButtonProps> = ({
    size = "normal",
    className = "",
    children,
    ...other
}) => {
    return (
        <button className={`Button ${size} ${className}`} {...other}>
            {children}
        </button>
    );
};
