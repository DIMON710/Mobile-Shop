import React, {useContext, useState} from 'react';
import {Admin} from "../../context/index.jsx";
import {useNavigate} from "react-router-dom";
import cl from './AdminAuth.module.scss';
const AdminAuth = () => {
    const [auth, setAuth] = useState({login: '', password: ''})
    const [admin, setAdmin] = useContext(Admin)
    const navigate = useNavigate();
    return (
        <div>
            <form className={cl.auth} onSubmit={(e) => {
                e.preventDefault()
                if (auth.login === 'admin' && auth.password === 'admin') {
                    setAdmin(true)
                    localStorage.setItem('admin', JSON.stringify(auth))
                    navigate('/orders')
                }
            }}>
                <input placeholder='Логин' type="text" value={auth.login} onChange={(e) => setAuth(prevState => ({...prevState, login: e.target.value}))}/>
                <input placeholder='Пароль' type="password"  value={auth.password} onChange={(e) => setAuth(prevState => ({...prevState, password: e.target.value}))}/>
                <button>Войти</button>
            </form>
        </div>
    );
};

export default AdminAuth;