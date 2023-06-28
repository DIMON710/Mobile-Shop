import React, {useContext, useEffect, useState} from 'react';
import cl from './Product.module.scss'
import {useNavigate} from "react-router-dom";
import {BasketButton, BasketProduct, Products} from "../../../context/index.js";
import productsServices from "../../../API/productsServices.js";
const Product = ({item, buttonFunc, btnName, id, admin}) => {
    const params = useNavigate()
    const [basketButton, setBasketButton] = useContext(BasketButton)
    const [productValue, setProductValue] = useContext(Products);
    const [inBasket, setInBasket] = useState(false)
    const btnClick = () => {
        buttonFunc(item.id)
        if (btnName === 'Удалить') {
            if (basketButton.findIndex(i => i === item.id) !== -1)
                setBasketButton([...basketButton].filter(i => i !== item.id));
        }
        if (btnName !== 'Удалить'){
            if (basketButton.findIndex(i => i === item.id) === -1)
            setBasketButton([...basketButton, item.id]);
        }

    }
    useEffect(() => {
        if (basketButton.findIndex(i => i === item.id) !== -1) {
            setInBasket(true);
        } else {
            setInBasket(false);
        }
    }, [basketButton])

    const removeProduct = (id) => {
        try {
            productsServices.remove(id)
            const filteredProducts = productValue.filter(product => product.id !== id)
            setProductValue(filteredProducts)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={cl.product}>
            {admin && <div className={cl.remove} onClick={() => removeProduct(id)}>x</div>}
            <div className={cl.photo}><img src={`http://localhost:3000/images/${item.img}`} alt={item.title}/></div>
            <h4 onClick={() => params(`/catalog/${item.id}`)}>{item.title}</h4>
            <p>{item.description}</p>
            <h3>{item.price} UAH</h3>
            <button onClick={btnClick}>{inBasket && btnName!== 'Удалить' ? 'В корзине' : btnName}</button>
        </div>
    );
};
export default Product;