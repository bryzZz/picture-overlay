import React from "react";
import "./style.css";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className='Header'>
            <h1 className='Header__title'>Picture overlay!</h1>
        </header>
    );
};
