import React, {useContext, useEffect} from 'react';
import cl from './Navbar.module.scss'
import Basket from "./Basket/Basket.jsx";
import {Link} from "react-router-dom";
import {Admin, BasketProduct} from "../../../context/index.jsx";
import productsServices from "../../../API/productsServices.js";
const Navbar = () => {
    const [admin] = useContext(Admin)
    const [basket, setBasket] = useContext(BasketProduct);
    useEffect(() => {
        if (localStorage.getItem('order')) {
            const order_id = localStorage.getItem('order');
            productsServices.getStatus(order_id).then(status => {
                if (status.data === 'success') {
                    localStorage.removeItem('basketProducts');
                    localStorage.removeItem('order')
                    setBasket([]);
                }
            })
        }
    }, [])
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