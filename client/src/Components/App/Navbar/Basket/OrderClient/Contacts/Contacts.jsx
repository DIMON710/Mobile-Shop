import {useRef} from 'react';
import InputMask from "react-input-mask";

const Contacts = ({Contacts, IsInvalid, Checked}) => {
    const [contacts, setContacts] = Contacts;
    const [isInvalid, setIsInvalid] = IsInvalid;
    const [checked, setChecked] = Checked;
    const firstNameRef = useRef(null)
    const secondNameRef = useRef(null)
    const telNameRef = useRef(null)
    const emailNameRef = useRef(null)
    const buttonRef = useRef(null)
    const invalidName = curr => curr.value === '' || curr.value.length < 2 || curr.value.split('').find(el => !isNaN(el)) !== undefined;
    const invalidEmail = curr => curr.value === '';
    const invalidTel = curr => curr.value.length !== 19;
    const currentCheck = () => !invalidName(firstNameRef.current) && !invalidName(secondNameRef.current) && !invalidEmail(emailNameRef.current) && !invalidTel(telNameRef.current)
    const handleInput = (curr, name, func) => {
        setContacts(prevState => ({...prevState, [name]: curr.value}))
        if (!func(curr)) {
            curr.style.borderColor = 'transparent';
            buttonRef.current.style.borderColor = 'transparent'
            if (currentCheck()) {
                buttonRef.current.style.borderColor = 'green';
            }
        }
    }
    const blurInput = (curr, func) => {
        if (func(curr)) {
            curr.style.borderColor = 'red';
            buttonRef.current.style.borderColor = 'transparent'
            setIsInvalid(prevState => ({...prevState, contacts: true}))
        }
    }

    const buttonCheck = (e) => {
        e.preventDefault()
        if (currentCheck()) {
            setIsInvalid(prevState => ({...prevState, contacts: false}))
            setChecked('delivery')
        } else {
            buttonRef.current.style.borderColor = 'red'
        }
    }

    return (
        <form onSubmit={e => buttonCheck(e)}>
            <h2>Ваши контактные данные</h2>
            <div>
                <label>Имя <input
                    value={contacts.firstName}
                    onChange={e => handleInput(e.target, 'firstName', invalidName)}
                    onBlur={e => blurInput(e.target, invalidName)}
                    name="firstName"
                    ref={firstNameRef}
                    type="text"
                /></label>
                <label>Фамилия <input
                    value={contacts.secondName}
                    name="secondName"
                    ref={secondNameRef}
                    onChange={e => handleInput(e.target, 'secondName', invalidName)}
                    onBlur={e => blurInput(e.target, invalidName)}
                    type="text"
                /></label>
            </div>
            <div>
                <label>Номер телефона <InputMask
                    type="tel"
                    mask="+380 (99) 999-99-99"
                    maskChar={null}
                    ref={telNameRef}
                    placeholder="+380 (__) ___-__-__"
                    value={contacts.tel}
                    onChange={(e) => {
                        handleInput(e.target, 'tel', invalidTel)
                        if (e.target.value.length === 19) {
                            e.target.blur()
                        }
                    }}
                    onBlur={e => blurInput(e.target, invalidTel)}
                /></label>
                <label>Электронная почта <input
                    onChange={e => handleInput(e.target, 'email', invalidEmail)}
                    onBlur={e => blurInput(e.target, invalidEmail)}
                    value={contacts.email}
                    ref={emailNameRef}
                    type="email"
                /></label>
            </div>
            <button ref={buttonRef}>Сохранить</button>
        </form>
    );
};

export default Contacts;