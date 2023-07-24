import React from 'react';
import cl from "./Order.module.scss";
import {Carousel} from "react-responsive-carousel";
const SERVER = import.meta.env.VITE_API_URL
const Order = ({order, changeOrder}) => {
    return (
        <div className={cl.order}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: 35}}>
                <h4 className={cl.id}>ID: {order.payment_id ? order.payment_id : order.order_id}</h4>
                <div onClick={() => {
                    changeOrder(order);
                }} className={`${cl.checkbox} ${order.complete ? cl.active : ''}`} ></div>
            </div>
            <div className={cl.main}>
                <Carousel className='slider' showArrows={true} showThumbs={false} showStatus={false}>
                    {order.img.map((photo, index) => (
                        <div key={index} className={cl.image}>
                            <img src={`${SERVER}/images/${photo}`} alt=""/>
                        </div>
                    ))}
                </Carousel>
                <div className={cl.description}>
                    <div><h4>Цена: {order.amount} {order.currency}</h4></div>
                    <div><h4>Статус оплаты: {order.status}</h4></div>
                    <div><h4>Товар: {order.description}</h4></div>
                    <div><h4>Адрес: {order.delivery}</h4></div>
                </div>
            </div>
            <h4 className={cl.date}>Дата: {order.date}</h4>
        </div>
    );
};

export default Order;