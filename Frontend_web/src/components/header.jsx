import React from "react";
import '../styles/header.css'

function Header() { 
    return (
        <header className="header">
            <div className="logo"><p>Logo</p></div>
            <div className="titulo"><h1>NOMBRE DE LA PAGINA</h1></div>
            <div className="iconUser"></div>
        </header>
    );
}

export default Header;