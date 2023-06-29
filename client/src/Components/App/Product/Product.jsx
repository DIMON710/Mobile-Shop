import React, {useContext, useEffect, useState} from 'react';
import cl from './Product.module.scss'
import {useNavigate} from "react-router-dom";
import {BasketProduct, Products} from "../../../context/index.js";
import productsServices from "../../../API/productsServices.js";
const Product = ({item, buttonFunc, btnName, id, admin}) => {
    const params = useNavigate()
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const [productValue, setProductValue] = useContext(Products);
    const [inBasket, setInBasket] = useState(false)
    const btnClick = () => {
        buttonFunc(item.id)
        if (btnName === 'Удалить') {
            if (basketProduct.findIndex(i => i.id === item.id) !== -1) {
                setBasketProduct([...basketProduct].filter(i => i.id !== item.id));
                if (localStorage.getItem('basketProducts')) {
                    const res = JSON.parse(localStorage.getItem('basketProducts'));
                    const req = JSON.stringify(res.filter(product => product !== item.id));
                    if (req.length === 2) {
                        localStorage.removeItem('basketProducts');
                    } else {
                        localStorage.setItem('basketProducts', req);
                    }
                }
            }
        }
        if (btnName !== 'Удалить'){
            if (basketProduct.findIndex(i => i.id === item.id) === -1) {
                setBasketProduct([item, ...basketProduct]);
                if (localStorage.getItem('basketProducts')) {
                    const res = JSON.parse(localStorage.getItem('basketProducts'));
                    res.push(item.id);
                    const req = JSON.stringify(res);
                    localStorage.setItem('basketProducts', req);
                } else {
                    const req = JSON.stringify([item.id]);
                    localStorage.setItem('basketProducts', req);
                }
            }
        }

    }
    useEffect(() => {
        if (basketProduct.findIndex(i => i.id === item.id) !== -1) {
            setInBasket(true);
        } else {
            setInBasket(false);
        }
    }, [basketProduct])

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
            <button style={inBasket && btnName!== 'Удалить' ? {border: '1px solid green'} : {}} onClick={btnClick}>{inBasket && btnName!== 'Удалить' ? 'В корзине' : btnName}</button>
        </div>
    );
};
export default Product;