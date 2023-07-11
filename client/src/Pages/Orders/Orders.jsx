import React, {useEffect, useState} from 'react';
import productsServices from "../../API/productsServices.js";
import Pagination from "../../Components/App/Product/Pagination/Pagination.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader.jsx";
import cl from './Orders.module.scss';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0)
    const {page} = useParams();
    const navigate = useNavigate();
    const getOrders = () => {
        productsServices.getPay(page).then(orders => {
            const correctOrders = orders.data.rows.map( order => {
                const date = new Date(Number(order.date));
                return order = {...order, date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
            });
            setOrders(correctOrders)
            setTotalPage(Math.ceil(orders.data.count/10))
            if (page > Math.ceil(orders.data.count/10)) {
                navigate(`/orders/${Math.ceil(orders.data.count/10)}`)
            }
            setIsLoading(false)
        });
    }
    useEffect(() => {
        if (page < 1 || isNaN(page)) {
            navigate('/orders/1')
        }
        getOrders();
    }, [page]);
    const changeOrder = (order) => {
        productsServices.changeOrder({id: order.order_id, complete: order.complete}).then(() => {
            getOrders();
        })
    }
    return (
        <div style={{paddingBottom: '5px', display: 'flex', flexDirection: 'column', gap: 15}}>
                {isLoading ? <Loader/> : orders.map(order => (
                    <div className={cl.orders} key={order.id}>
                        <div><h4 className={cl.id}>ID: {order.payment_id ? order.payment_id : order.order_id}</h4>
                            <h4>Статус оплаты: {order.status}</h4></div>
                        <div className={cl.price}><h4>Цена: {order.amount} {order.currency}</h4></div>
                        <div><h4>Описание: {order.description}</h4></div>
                        <div><h4>Доставка: {order.delivery}</h4></div>
                        <label>Отправлен <input type="checkbox" checked={order.complete} onChange={() => {
                            changeOrder(order);
                        }}/></label>
                        <h4 className={cl.date}>Дата: {order.date}</h4>
                    </div>
                ))}
                {!isLoading && orders.length === 0 && <h1>Нет заказов</h1>}
                <Pagination currentPage={page} totalPage={totalPage} endpoint={'/orders/'}/>
        </div>
    );
};

export default Orders;