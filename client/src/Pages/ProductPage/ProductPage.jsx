import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import productsServices from '../../API/productsServices.js';
import Loader from '../../Components/UI/Loader/Loader.jsx';
import cl from './ProductPage.module.scss';
import {BasketProduct, Products} from "../../context/index.jsx";
const SERVER = import.meta.env.VITE_API_URL
const ProductPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [btnName, setBtnName] = useState('В корзину')
    const [inBasket, setInBasket] = useState(false);
    const [productValue] = useContext(Products);
    const [basketProduct, setBasketProduct] = useContext(BasketProduct);
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        productsServices.getOne(id).then((res) => {
            if (res.data !== '') {
                setProduct(res.data)
                setIsLoading(false)
            } else {
                navigate('/')
            }
        })
    }, [])

    useEffect(() => {
        if (basketProduct.find(product => product.id == id)) {
            setInBasket(true);
            setBtnName('В корзине')
        } else {
            setInBasket(false);
            setBtnName('В корзину')
        }
    }, [basketProduct, id]);
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
            <div className={cl.body}>
                <div className={cl.image}>
                    <img src={`${SERVER}/images/${product.img}`}
                         alt={product.title}
                    />
                </div>
                <div className={cl.content} >
                    <p>{product.description}</p>
                    <h3 className={cl.price}><strong>{product.price} UAH</strong></h3>
                    <button style={inBasket ? {border: '1px solid green'} : {}} onClick={btnClick}>{btnName}</button>
                </div>
            </div>
        </div>}
    </>);
};

export default ProductPage;