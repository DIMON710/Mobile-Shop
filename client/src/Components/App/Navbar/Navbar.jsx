import React from 'react';
import cl from './Navbar.module.scss'
import Basket from "./Basket/Basket.jsx";
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <div>
            <ul className={cl.navbar}>
                <li><Link to='/'>Главная</Link></li>
                <li></li>
                <li><Basket/></li>
            </ul>
        </div>
    );
};

export default Navbar;