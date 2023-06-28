import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Components/App/Navbar/Navbar.jsx";
import {BasketButton, BasketProduct} from "../context/index.js";

const Main = () => {
    const [basketProduct, setBasketProduct] = useState([]);
    const [basketButton, setBasketButton] = useState([])
    return (
        <div>
            <BasketProduct.Provider value={[basketProduct, setBasketProduct]}>
                <BasketButton.Provider value={[basketButton, setBasketButton]}>
                <Navbar/>
                <Outlet/>
                </BasketButton.Provider>
            </BasketProduct.Provider>
        </div>
    );
};

export default Main;