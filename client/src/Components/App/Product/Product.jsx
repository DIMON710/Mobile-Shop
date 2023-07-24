import React, {useContext, useEffect, useState} from 'react';
import cl from './Product.module.scss'
import {useNavigate} from "react-router-dom";
import {Admin, BasketProduct, Products} from "../../../context/index.jsx";
import productsServices from "../../../API/productsServices.js";
const SERVER = import.meta.env.VITE_API_URL
const Product = ({item, buttonFunc, btnName, id, changeProducts}) => {
    const params = useNavigate();
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const [admin] = useContext(Admin);
    const [productValue, setProductValue] = useContext(Products);
    const [inBasket, setInBasket] = useState(false);
    const [activeStyle, setActiveStyle] = useState({up: false, down: false})
    const btnClick = () => {
        buttonFunc(item.id)
        if (btnName === 'Удалить') {
            if (basketProduct.findIndex(i => i.id === item.id) !== -1) {
                setBasketProduct([...basketProduct].filter(i => i.id !== item.id));
                if (localStorage.getItem('basketProducts')) {
                    const res = JSON.parse(localStorage.getItem('basketProducts'));
                    const req = JSON.stringify(res.filter(product => product.id !== item.id));
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
                setBasketProduct([{...item, quantity: 1}, ...basketProduct]);
                if (localStorage.getItem('basketProducts')) {
                    const res = JSON.parse(localStorage.getItem('basketProducts'));
                    res.unshift({id: item.id, quantity: 1});
                    const req = JSON.stringify(res);
                    localStorage.setItem('basketProducts', req);
                } else {
                    const req = JSON.stringify([{id: item.id, quantity: 1}]);
                    localStorage.setItem('basketProducts', req);
                }
            }
        }
    }
    useEffect(() => {
        if (!admin) {
            if (basketProduct.findIndex(i => i.id === item.id) !== -1) {
                setInBasket(true);
            } else {
                setInBasket(false);
            }
        }
    }, [basketProduct]);

    const removeProduct = (id) => {
        try {
            productsServices.remove(id)
            const filteredProducts = productValue.filter(product => product.id !== id)
            setProductValue(filteredProducts)
        } catch (e) {
            console.log(e);
        }
    }
    const changeQuantity = (sign = '', e = undefined) => {
        const basketIndex = basketProduct.findIndex(product => product.id === item.id)
        let basket = [...basketProduct];
        if (sign === '-') {
            if (item.quantity > 1) {
                setActiveStyle(prevState => ({...prevState, down: true}))
                basket[basketIndex].quantity = basket[basketIndex].quantity - 1
                setTimeout(() => {
                    setActiveStyle(prevState => ({...prevState, down: false}))
                }, 200)
            }
        } else if (sign === '+') {
            if (item.quantity < 20) {
                setActiveStyle(prevState => ({...prevState, up: true}))
                basket[basketIndex].quantity = Number(basket[basketIndex].quantity) + 1
                setTimeout(() => {
                    setActiveStyle(prevState => ({...prevState, up: false}))
                }, 200)
            }
        } else {
            if (e.target.value < 21 && e.target.value > -1 && e.target.value !== '0' && !isNaN(e.target.value)) {
                basket[basketIndex].quantity = e.target.value
            }
        }
        setBasketProduct(basket)
        const res = JSON.parse(localStorage.getItem('basketProducts'));
        const index = res.findIndex(product => product.id === item.id)
        res[index].quantity = basket[basketIndex].quantity
        const req = JSON.stringify(res);
        localStorage.setItem('basketProducts', req);
    }
    return (
        <div className={cl.product}>
            {changeProducts && <div className={cl.remove} onClick={() => removeProduct(id)}>x</div>}
            <div className={cl.photo}><img src={`${SERVER}/images/${item.img}`} alt={item.title}/></div>
            <h4 onClick={() => {
                if (btnName !== 'Удалить') {
                    params(`/product/${item.id}`)
                }
            }}>{item.title}</h4>
            <p>{item.description}</p>
            {btnName === 'Удалить' && <div className={cl.quantity}>
                <button style={activeStyle.down ? {borderColor: 'red'} : {}} onClick={() => changeQuantity('-')}>-</button>
                <input value={item.quantity} onBlur={(event) => {
                    if (event.target.value === '') {
                        const e = {target: {value: 1}}
                        changeQuantity('', e)
                    }
                }} onChange={(e) => changeQuantity('', e)} type="number"/>
                <button style={activeStyle.up ? {borderColor: 'green'} : {}} onClick={() => changeQuantity('+')}>+</button>
            </div>}
            <h3>{item.price} UAH</h3>
            {!admin && <button style={inBasket && btnName !== 'Удалить' ? {border: '1px solid green'} : {}}
                     onClick={btnClick}>{inBasket && btnName !== 'Удалить' ? 'В корзине' : btnName}</button>}
        </div>
    );
};
export default Product;