import React, {useContext, useState} from 'react';
import productsServices from "../../../../../API/productsServices.js";
import cl from './OrderClient.module.scss';
import './OrderClient.module.scss';
import {BasketProduct} from "../../../../../context/index.jsx";
import {v4} from 'uuid';
const OrderClient = ({total, setIsOpenOrder, refOrder}) => {
    const [basket, setBasket] = useContext(BasketProduct);
    const [delivery, setDelivery] = useState({city: 'Харьков', house: '', street: '', flat: '', building: ''});
    const pay = (e) => {
        e.preventDefault();
        if (delivery.city === '' || delivery.street === '' || delivery.flat === '' || delivery.house === '') return
        const order_id = v4()
        localStorage.setItem('order', order_id)
        const description = basket.reduce((sum, product) => sum += product.title + ', ', '').slice(0, -2);
        const newDelivery = `г. ${delivery.city}, ул. ${delivery.street}, д. ${delivery.house},${delivery.building !== '' ? ' к. ' + delivery.building + ',' : ''} кв. ${delivery.flat}`;
        const img = basket.map(product => product.img)
        productsServices.pay({amount: total, description, delivery: newDelivery, img, order_id}).then(r => {
            window.open(r.data, '_blank');
        })
    }
    return (
        <div className='order' ref={refOrder}>
            <div className={cl.wrapper} onClick={() => setIsOpenOrder(false)}>
                <div className={cl.order}  onClick={(e) => e.stopPropagation()}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h2>Адрес доставки: </h2>
                        <div onClick={() => setIsOpenOrder(prevState => !prevState)} className={cl.close}></div>
                    </div>
                    <form onSubmit={pay}>
                        <label>Город <input value="Харьков" disabled type="text"/></label>
                        <label>Улица <input onChange={(e) => {
                            setDelivery(prevState => ({...prevState, street: e.target.value}))
                        }
                        } value={delivery.street} type="text"/></label>
                        <div>
                            <label>Дом <input onChange={(e) => {
                                setDelivery(prevState => ({...prevState, house: e.target.value}))
                            }
                            } value={delivery.house} type="text"/></label>
                            <label>Корпус <input placeholder="Не обязательно" onChange={(e) => {
                                setDelivery(prevState => ({...prevState, building: e.target.value}))
                            }
                            } value={delivery.building} type="text"/></label>
                            <label>Квартира <input onChange={(e) => {
                                setDelivery(prevState => ({...prevState, flat: e.target.value}))
                            }} value={delivery.flat} type="text"/></label>
                        </div>
                        <button>Перейти к оплате</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderClient;