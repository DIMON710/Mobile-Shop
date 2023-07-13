import React, {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import productsServices from "../../API/productsServices.js";
import Pagination from "../../Components/Pagination/Pagination.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader.jsx";
import cl from './Orders.module.scss';
import './transitionOrders.scss';
import './myClider.scss';
import FilterOrders from "../../Components/App/FilterOrders/FilterOrders.jsx";
import Order from "../../Components/App/Order/Order.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [totalPage, setTotalPage] = useState(0)
    const [filtersOrders, setFiltersOrders] = useState([
        {title: 'Отправленные', name: 'sand', value: {complete: true}, checked: false},
        {title: 'Неотправленные', name: 'sand', value: {complete: false}, checked: true},
        {title: 'Оплаченные', name: 'pay', value: {status: 'success'}, checked: true},
        {title: 'Неоплаченные', name: 'pay', value: {status: 'processing'}, checked: false},
    ]);
    const {page} = useParams();
    const navigate = useNavigate();
    const getFilteredOrders = () => {
        const filtersObject = filtersOrders.filter(filter => filter.checked);
        productsServices.filterOrders(filtersObject, page).then(orders => {
            const correctOrders = orders.data.rows.map( order => {
                const date = new Date(Number(order.date));
                return order = {...order, date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()}
            });
            setOrders(correctOrders)
            setTotalPage(Math.ceil(orders.data.count/10))
            if (page > Math.ceil(orders.data.count/10) && page > 1) {
                navigate(`/orders/${Math.ceil(orders.data.count/10)}`)
            }
            setIsLoading(false);
        })
    }
    const changeFilter = (filters) => {
        let changedFilters = [...filtersOrders];
        changedFilters = changedFilters.map(filter => ({...filter, checked: false}))
        filters.map(el => {
            changedFilters = changedFilters.map(filter => {
                if (filter.title === el.title) {
                    return {...filter, checked: true}
                } else {
                    return filter
                }
            })
        })
        setFiltersOrders(changedFilters);
    }
    useEffect(() => {
        if (localStorage.getItem('filter')) {
            const filters = JSON.parse(localStorage.getItem('filter'))
            changeFilter(filters)
        }
    }, [])
    useEffect(() => {
        if (page < 1 || isNaN(page)) {
            navigate('/orders/1')
        }
        getFilteredOrders();
    }, [page]);
    useEffect(() => {
        getFilteredOrders()
    }, [filtersOrders])
    const changeOrder = (order) => {
        productsServices.changeOrder({id: order.order_id, complete: order.complete}).then(() => {
            getFilteredOrders();
        })
    }
    return (
        <div className={cl.wrapper}>
                <FilterOrders isOpenFilter={isOpenFilter} settings={[filtersOrders, setFiltersOrders]}/>
                <div className={cl.main}>
                    {isLoading ? <Loader/> :
                        <>
                            <button onClick={() => setIsOpenFilter(prevState => !prevState)}>Фильтры</button>
                            <TransitionGroup className={cl.orders}>
                                {orders.map(order => (
                                    <CSSTransition
                                        key={order.id}
                                        timeout={300}
                                        classNames="order"
                                    >
                                        <div><Order order={order} changeOrder={changeOrder}/></div>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            <Pagination currentPage={page} totalPage={totalPage} endpoint={'/orders/'}/>
                        </>
                    }
                    {!isLoading && orders.length === 0 && <h1>Нет заказов</h1>}
                </div>
        </div>
    );
};

export default Orders;