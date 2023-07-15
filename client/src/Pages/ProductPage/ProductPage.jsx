import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import productsServices from '../../API/productsServices.js';
import Loader from '../../Components/Loader/Loader.jsx';
import cl from './ProductPage.module.scss';
import {BasketProduct, Products} from "../../context/index.jsx";
const ProductPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState(true)
    const [btnName, setBtnName] = useState('В корзину')
    const [inBasket, setInBasket] = useState(false);
    const [productValue] = useContext(Products);
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const params = useParams()
    useEffect(() => {
        if (basketProduct.findIndex(i => i.id === product.id) !== -1) {
            setInBasket(true);
            setBtnName('В корзине')
        } else {
            setInBasket(false);
            setBtnName('В корзину')
        }
    }, [basketProduct, params]);

    useEffect(() => {
        productsServices.getOne(params.id).then((res) => {
            setProduct(res.data)
            setIsLoading(false)
        })
    }, [])
    const basketFunc = (id) => {
        const index = productValue.findIndex(item => item.id === id);
        if ((basketProduct.findIndex(item => item.id === id) === -1))
            setBasketProduct([...basketProduct, productValue[index]]);
    }
    const btnClick = () => {
        basketFunc(product.id)
        if (btnName !== 'Удалить') {
            if (basketProduct.findIndex(i => i.id === product.id) === -1) {
                setBasketProduct([{...product, quantity: 1}, ...basketProduct]);
                if (localStorage.getItem('basketProducts')) {
                    const res = JSON.parse(localStorage.getItem('basketProducts'));
                    res.unshift({id: product.id, quantity: 1});
                    const req = JSON.stringify(res);
                    localStorage.setItem('basketProducts', req);
                } else {
                    const req = JSON.stringify([{id: product.id, quantity: 1}]);
                    localStorage.setItem('basketProducts', req);
                }
                setBtnName('В корзине');
            }
        }
    }
    return (<>
        {isLoading ? <Loader/> : <div className={cl.product}>
            <h1>{product.title}</h1>
            <div style={{display: 'flex', gap: 200, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <div style={{width: 300, height: 400, backgroundColor: '#fff', borderRadius: 8}}>
                    <img style={{width: '100%', height: '100%', objectFit: 'contain'}}
                         src={`http://178.165.38.121:5000/images/${product.img}`}
                         alt={product.title}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 15, fontSize: 20}}>
                    <p>{product.description}</p>
                    <h3 className={cl.price}><strong>{product.price} UAH</strong></h3>
                    <button style={inBasket ? {border: '1px solid green'} : {}} onClick={btnClick}>{btnName}</button>
                </div>
            </div>
        </div>}
    </>);
};

export default ProductPage;