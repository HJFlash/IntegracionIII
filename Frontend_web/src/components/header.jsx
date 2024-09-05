import React from "react";
import '../styles/header.css';
import { Link } from "react-router-dom";

function Header() { 
    return (
        <header className="header">
            <div className="logo"><p>Logo</p></div>
            <div className="titulo"><h1>NOMBRE DE LA PAGINA</h1></div>
            

            <Link to="/Login">
                <div className="iconUser"></div>
            </Link>
        </header>
    );
}

export default Header;