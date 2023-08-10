import FilterOrders from "../../../../FilterOrders/FilterOrders.jsx";
import {useEffect, useState} from "react";
import './PayMeth.scss'
const PayMeth = ({PayMeth, IsInvalid}) => {
    const [paymentMethod, setPaymentMethod] = useState([
        {title: 'Картой онлайн', value: 'card', name: 'pay', checked: false},
        {title: 'При получении', value: 'receipt', name: 'pay', checked: false},
    ]);
    const [payMeth, setPayMeth] = PayMeth;
    const [isInvalid, setIsInvalid] = IsInvalid;
    useEffect(() => {
        if (payMeth !== '') {
            const wayIndex = paymentMethod.findIndex(el => el.value === payMeth);
            const newPayMeth = [...paymentMethod]
            newPayMeth[wayIndex] = {...newPayMeth[wayIndex], checked: true}
            setPaymentMethod(newPayMeth)
        }
    }, []);
    useEffect(() => {
        const way = paymentMethod.find(el => el.checked);
        if (way && way.value !== payMeth) {
            setPayMeth(way.value);
            setIsInvalid(prevState => ({...prevState, payMeth: false}));
        }
    }, [paymentMethod]);
    return (
        <form className="payMeth" onSubmit={e => e.preventDefault()}>
            <h2>Оплата</h2>
            <FilterOrders isOpenFilter={true} settings={[paymentMethod, setPaymentMethod]}/>
        </form>
    );
};

export default PayMeth;