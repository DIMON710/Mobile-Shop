import React, {useContext, useRef, useState} from 'react';
import productsServices from "../../../../../API/productsServices.js";
import cl from './OrderClient.module.scss';
import './transitionChapter.scss';
import './OrderClient.module.scss';
import {BasketProduct} from "../../../../../context/index.jsx";
import {v4} from 'uuid';
import Contacts from "./Contacts/Contacts.jsx";
import Delivery from "./Delivery/Delivery.jsx";
import PayMeth from "./PayMeth/PayMeth.jsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
const OrderClient = ({total, setIsOpenOrder, refOrder}) => {
    const [basket, setBasket] = useContext(BasketProduct);
    const [contacts, setContacts] = useState({firstName: '', secondName: '', tel: '', surname: ''});
    const [delivery, setDelivery] = useState({city: 'Харьков', house: '', street: '', flat: '', building: ''});
    const [payMeth, setPayMeth] = useState('');

    const [isInvalid, setIsInvalid] = useState({contacts: true, delivery: true, payMeth: true})
    const pay = (e) => {
        e.preventDefault();
        if (isInvalid.contacts || isInvalid.delivery || isInvalid.payMeth) return

        const order_id = v4()
        localStorage.setItem('order', order_id)
        const description = basket.reduce((sum, product) => sum += `${product.title}${product.quantity > 1 ? ` (${product.quantity}шт)` : ''}, `, '').slice(0, -2);
        const newDelivery = `г. ${delivery.city}, ул. ${delivery.street}, д. ${delivery.house},${delivery.building !== '' ? ' к. ' + delivery.building + ',' : ''} кв. ${delivery.flat}`;
        const img = basket.map(product => product.img)
        if (payMeth === 'card') {
            productsServices.pay({amount: total, description, delivery: newDelivery, img, order_id, fullName: `${contacts.firstName} ${contacts.secondName} ${contacts.surname}`, tel: contacts.tel}).then(r => {
                setIsOpenOrder(false)
                window.open(r.data, '_blank');
            })
        } else if (payMeth === 'receipt') {
            productsServices.newOrder({amount: total, description, delivery: newDelivery, img, order_id, fullName: `${contacts.firstName} ${contacts.secondName} ${contacts.surname}`, tel: contacts.tel}).then(r => {
                setBasket([]);
                setIsOpenOrder(false)
            });
        }
    }
    const [checked, setChecked] = useState('contacts')
    const menu = [
        {value: 'contacts', title: 'Контакты'},
        {value: 'delivery', title: 'Доставка'},
        {value: 'payMeth', title: 'Способ оплаты'},
    ]
    const toggleMenu = (name) => {
        setChecked(name)
    }
    return (
        <div className='order' ref={refOrder}>
            <div className={cl.wrapper} onClick={() => setIsOpenOrder(false)}>
                <div className={cl.order}  onClick={(e) => e.stopPropagation()}>
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '25px 25px 15px 25px'}}>
                        <h2>Оформление заказа: </h2>
                        <div onClick={() => setIsOpenOrder(false)} className={cl.close}></div>
                    </div>
                    <div className={cl.body}>
                        <div>
                            <ul className={cl.accordion}>
                                {menu.map((el, i, arr) =>
                                    <React.Fragment key={el.value}>
                                        <li
                                            style={checked === el.value ? {borderColor: '#646cff'} : !isInvalid[el.value] ? {borderColor: 'green'} : {}}
                                            onClick={() => toggleMenu(el.value)}>{el.title}
                                        </li>
                                        {i !== arr.length - 1 && <div>></div>}
                                    </React.Fragment>
                                )}
                            </ul>
                            <SwitchTransition>
                                <CSSTransition
                                    key={checked}
                                    className="chapter"
                                    timeout={300}>
                                    <div>
                                        {checked === 'contacts' && <Contacts Contacts={[contacts, setContacts]} Checked={[checked, setChecked]}
                                                                        IsInvalid={[isInvalid, setIsInvalid]}/>}
                                        {checked === 'delivery' && <Delivery Delivery={[delivery, setDelivery]} Checked={[checked, setChecked]}
                                                                        IsInvalid={[isInvalid, setIsInvalid]}/>}
                                        {checked === 'payMeth' && <PayMeth PayMeth={[payMeth, setPayMeth]} Checked={[checked, setChecked]}
                                                                        IsInvalid={[isInvalid, setIsInvalid]}/>}
                                    </div>
                                </CSSTransition>
                            </SwitchTransition>
                        </div>
                        <button style={!isInvalid.contacts && !isInvalid.delivery && !isInvalid.payMeth ? {borderColor: 'green'} : {}} onClick={pay}>Заказать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderClient;