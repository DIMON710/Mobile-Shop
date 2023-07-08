import React, {useContext} from 'react';
import cl from './Navbar.module.scss'
import Basket from "./Basket/Basket.jsx";
import {Link} from "react-router-dom";
import {Admin} from "../../../context/index.jsx";
const Navbar = () => {
    const [admin] = useContext(Admin)
    return (
        <div>
            <ul className={cl.navbar}>
                <li><Link to='/1'>Товары</Link></li>
                {admin ? <li><Link to='/orders/1'>Заказы</Link></li> : <li><Basket/></li>}
            </ul>
        </div>
    );
};

export default Navbar;