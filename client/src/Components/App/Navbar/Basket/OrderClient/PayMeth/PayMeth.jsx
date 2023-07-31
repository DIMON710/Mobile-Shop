import FilterOrders from "../../../../FilterOrders/FilterOrders.jsx";
import {useEffect, useState} from "react";
import './PayMeth.scss'
const PayMeth = ({PayMeth, IsInvalid}) => {
    const [paymentMethod, setPaymentMethod] = useState([
        {title: 'Картой онлайн', name: 'pay', checked: false},
        {title: 'При получении', name: 'pay', checked: false},
    ]);
    const [payMeth, setPayMeth] = PayMeth;
    const [isInvalid, setIsInvalid] = IsInvalid;
    useEffect(() => {
        if (payMeth !== '') {
            const wayIndex = paymentMethod.findIndex(el => el.title === payMeth);
            const newPayMeth = [...paymentMethod]
            newPayMeth[wayIndex] = {...newPayMeth[wayIndex], checked: true}
            setPaymentMethod(newPayMeth)
        }
    }, []);
    useEffect(() => {
        const way = paymentMethod.find(el => el.checked);
        if (way && way.title !== payMeth) {
            setPayMeth(way.title);
            setIsInvalid(prevState => ({...prevState, payMeth: false}));
        } else if (way) {
            setIsInvalid(prevState => ({...prevState, payMeth: true}));
            setPayMeth('');
        }
    }, [paymentMethod]);
    return (
        <form className="payMeth" onSubmit={e => e.preventDefault()}>
            <h2>Оплата</h2>
            <FilterOrders isOpenFilter={true} settings={[paymentMethod, setPaymentMethod]}/>
            {/*<button>Сохранить</button>*/}
        </form>
    );
};

export default PayMeth;