import React, {useContext, useState} from 'react';
import {Admin} from "../context/index.jsx";
import {useNavigate} from "react-router-dom";

const AdminAuth = () => {
    const [auth, setAuth] = useState({login: '', password: ''})
    const [admin, setAdmin] = useContext(Admin)
    const navigate = useNavigate();
    return (
        <div>
            <form style={{display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '350px', margin: '0 auto'}} onSubmit={(e) => {
                e.preventDefault()
                if (auth.login === 'admin' && auth.password === 'admin') {
                    setAdmin(true)
                    localStorage.setItem('admin', JSON.stringify(auth))
                    navigate('/orders')
                }
            }}>
                <input style={{padding: '5px 0 5px 5px'}} placeholder='Логин' type="text" value={auth.login} onChange={(e) => setAuth(prevState => ({...prevState, login: e.target.value}))}/>
                <input style={{padding: '5px 0 5px 5px'}} placeholder='Пароль' type="password"  value={auth.password} onChange={(e) => setAuth(prevState => ({...prevState, password: e.target.value}))}/>
                <button>Войти</button>
            </form>
        </div>
    );
};

export default AdminAuth;