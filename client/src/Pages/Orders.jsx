import React, {useEffect, useState} from 'react';
import productsServices from "../API/productsServices.js";
import Pagination from "../Components/App/Product/Pagination/Pagination.jsx";
import {useParams} from "react-router-dom";
import Loader from "../Components/Loader/Loader.jsx";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1)
    const {page} = useParams();
    useEffect(() => {
        productsServices.getPay(page).then(orders => {
            setOrders(orders.data.rows)
            setTotalPage(Math.ceil(orders.data.count/10))
            setIsLoading(false)
        });
    }, [page])
    return (
        <div style={{paddingBottom: '5px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px', paddingBottom: '15px'}}>
                {isLoading ? <Loader/> : orders.map(order => (
                    <div style={{border: '1px solid #646cff', padding: '15px', borderRadius: '8px'}} key={order.id}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}><h4>ID: {order.payment_id}</h4>
                            <h4>Цена: {order.amount} {order.currency}</h4>
                            <h4>Статус оплаты: {order.status}</h4>
                            <h4>Дата: {order.createdAt}</h4></div>
                        <h4 style={{paddingTop: '15px', textAlign: 'left'}}>Описание: {order.description}</h4>
                    </div>
                ))}
            </div>
            <Pagination currentPage={page} totalPage={totalPage} endpoint={'/orders/'}/>
        </div>
    );
};

export default Orders;