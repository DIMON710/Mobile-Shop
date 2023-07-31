import {useRef} from "react";

const Delivery = ({Delivery, IsInvalid, Checked}) => {
    const [delivery, setDelivery] = Delivery;
    const [isInvalid, setIsInvalid] = IsInvalid;
    const [checked, setChecked] = Checked;
    const houseRef = useRef(null);
    const flatRef = useRef(null);
    const streetRef = useRef(null);
    const buttonRef = useRef(null);
    const invalidHouse = (curr) => curr.value === '' || isNaN(curr.value[0]) || curr.value.length > 7;
    const invalidFlat = (curr) => curr.value === '' || curr.value.length > 6;
    const invalidStreet = (curr) => curr.value === '' || !isNaN(curr.value[0]);
    const currentCheck = () => !invalidHouse(houseRef.current) && !invalidFlat(flatRef.current) && !invalidStreet(streetRef.current)
    const handleChangeInput = (curr, name, func) => {
        setDelivery(prevState => ({...prevState, [name]: curr.value}))
        if (!func(curr)) {
            curr.style.borderColor = 'transparent';
            buttonRef.current.style.borderColor = 'transparent'
            if (currentCheck()) {
                buttonRef.current.style.borderColor = 'green';
            }
        }
    }
    const handleBlurInput = (curr, func) => {
        if (func(curr)) {
            curr.style.borderColor = 'red';
            buttonRef.current.style.borderColor = 'transparent'
            setIsInvalid(prevState => ({...prevState, delivery: true}))
        }
    }
    const buttonCheck = (e) => {
        e.preventDefault()
        if (currentCheck()) {
            setIsInvalid(prevState => ({...prevState, delivery: false}))
            setChecked('payMeth')
        } else {
            buttonRef.current.style.borderColor = 'red'
        }
    }
    return (
        <form onSubmit={e => buttonCheck(e)}>
            <h2>Доставка</h2>
            <label>Город <input value="Харьков" disabled type="text"/></label>
            <label>Улица <input
                onChange={(e) => handleChangeInput(e.target, 'street', invalidStreet)}
                onBlur={(e) => handleBlurInput(e.target, invalidStreet)}
                value={delivery.street}
                ref={streetRef}
                type="text"
            /></label>
            <div>
                <label>Дом <input
                    onChange={(e) => handleChangeInput(e.target, 'house', invalidHouse)}
                    onBlur={(e) => handleBlurInput(e.target, invalidHouse)}
                    value={delivery.house}
                    ref={houseRef}
                    type="text"
                /></label>
                <label>Корпус <input
                    onChange={(e) => setDelivery(prevState => ({...prevState, building: e.target.value}))}
                    value={delivery.building}
                    placeholder="Не обязательно"
                    type="text"
                /></label>
                <label>Квартира <input
                    onChange={(e) => handleChangeInput(e.target, 'flat', invalidFlat)}
                    onBlur={(e) => handleBlurInput(e.target, invalidFlat)}
                    value={delivery.flat}
                    ref={flatRef}
                    type="text"
                /></label>
            </div>
            <button ref={buttonRef}>Сохранить</button>
        </form>
    );
};

export default Delivery;