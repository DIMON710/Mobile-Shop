import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from './Basket.module.scss'
import './transitionBasket.scss'
import Product from "../../Product/Product.jsx";
import {BasketProduct} from "../../../../context/index.jsx";
import {CSSTransition} from "react-transition-group";
import productsServices from "../../../../API/productsServices.js";
import Loader from "../../../Loader/Loader.jsx";
const Basket = () => {
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const refBasket = useRef(null);
    const [basket, setBasket] = useContext(BasketProduct);
    let total = 0;
    const removeBasket = (id) => {
        if ((basket.findIndex(item => item.id === id) !== -1))
            setBasket(basket.filter(item => item.id !== id));
        setTimeout(() => {
            if (basket.length === 1) setActive(false)
        }, 300)
    }
    useEffect(() => {
        if (localStorage.getItem('basketProducts')) {
            const basketProductsId = JSON.parse(localStorage.getItem('basketProducts'))
            productsServices.getSome(basketProductsId).then(products => {
                setBasket(products.data);
                setIsLoading(false)
            });
        } else {
            setIsLoading(false)
        }
    }, []);
    const pay = () => {
        const description = basket.reduce((sum, product) => sum += product.title + ', ', '').slice(0, -2);
        productsServices.pay({amount: total, description}).then(r => {
            window.open(r.data, '_blank');
        })
    }
    return (
        <>
            <button className={`${basket.length > 0 && cl.basketBtn}`} onClick={() => setActive(!active)}>
                Корзина
            </button>
            <CSSTransition
                nodeRef={refBasket}
                in={active}
                className="basket"
                timeout={300}
                unmountOnExit
            >
            <div ref={refBasket}>
                <div onClick={() => setActive(!active)} className={cl.basket}>
                    <div onClick={(e) => e.stopPropagation()} className={cl.body}>
                        <div className={cl.title}>
                            <h2>Корзина</h2>
                            <div onClick={() => setActive(!active)} className={cl.close}></div>
                        </div>
                        {basket.length ?
                            <>
                                <div className={cl.products}>
                                    <div className={cl.product}>{basket.map(item => {
                                        total+=Number(item.price);
                                        return <Product key={item.id} item={item} buttonFunc={removeBasket} btnName={'Удалить'}/>
                                    })}
                                    </div>
                                    <div className={cl.btns}>
                                        <h3><strong>{total} UAH</strong></h3>
                                        <button onClick={pay} style={{width: '30%'}}><h3>Оформить заказ</h3></button>
                                    </div>
                                </div>
                            </> : isLoading ? <Loader/> :
                            <p>Корзина пуста</p>}
                    </div>
                </div>
            </div>
            </CSSTransition>
        </>
    );
};

export default Basket;