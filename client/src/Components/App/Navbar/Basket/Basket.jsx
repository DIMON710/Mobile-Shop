import React, {useContext, useEffect, useRef, useState} from 'react';
import cl from './Basket.module.scss'
import './transitionBasket.scss'
import './OrderClient/transitionOrder.scss'
import './transitionProducts.scss'
import Product from "../../Product/Product.jsx";
import {BasketProduct} from "../../../../context/index.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import productsServices from "../../../../API/productsServices.js";
import Loader from "../../../Loader/Loader.jsx";
import OrderClient from "./OrderClient/OrderClient.jsx";
const Basket = () => {
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const refBasket = useRef(null);
    const refOrder = useRef(null);
    const [basket, setBasket] = useContext(BasketProduct);
    const [total, setTotal] = useState(true);
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
                const newProducts = products.data.map(product => {
                    const quantity = basketProductsId.find(basketProduct => product.id === basketProduct.id).quantity
                    return {...product, quantity}
                })
                setBasket(newProducts);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false)
        }
    }, []);
    useEffect(() => {
        let countTotal = 0
        basket.map(product => {
            countTotal+= product.price * product.quantity;
        })
        setTotal(countTotal)
    }, [basket])
    const HandleOrder = () => {
        setIsOpenOrder(prevState => !prevState);
        setActive(prevState => !prevState);
    }
    return (
        <>
            <button className={`${basket.length > 0 && cl.basketBtn}`} onClick={() => {
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
                setActive(!active)
            }}>
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
                                <div className={cl.products}>
                                    <TransitionGroup className={cl.product}>
                                        {basket.map(item => (
                                            <CSSTransition
                                                key={item.id}
                                                timeout={300}
                                                classNames="product"
                                            >
                                                <Product item={item} buttonFunc={removeBasket} btnName={'Удалить'}/>
                                            </CSSTransition>
                                        ))}
                                    </TransitionGroup>
                                    {basket.length > 0 && <div className={cl.btns}>
                                        <h3><strong>{total} UAH</strong></h3>
                                        <button onClick={HandleOrder} style={{width: '30%'}}><h3>Оформить заказ</h3>
                                        </button>
                                    </div>}
                                </div>
                            {basket.length < 1 ? isLoading ? <Loader/> : <p>Корзина пуста</p> : <></>}
                        </div>
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition
                nodeRef={refOrder}
                in={isOpenOrder}
                className="order"
                timeout={300}
                unmountOnExit
            ><OrderClient refOrder={refOrder} setIsOpenOrder={setIsOpenOrder} total={total}/></CSSTransition>
        </>
    );
};

export default Basket;