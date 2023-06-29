import React, {useState} from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Components/App/Navbar/Navbar.jsx";
import {BasketProduct} from "../context/index.js";

const Main = () => {
    const [basketProduct, setBasketProduct] = useState([]);
    return (
        <div>
            <BasketProduct.Provider value={[basketProduct, setBasketProduct]}>
                <Navbar/>
                <Outlet/>
            </BasketProduct.Provider>
        </div>
    );
};

export default Main;