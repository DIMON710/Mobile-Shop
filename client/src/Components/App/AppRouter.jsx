import React, {useContext, useEffect, useState} from 'react';
import {Admin} from "../../context/index.jsx";
import {Route, Routes} from "react-router-dom";
import Main from "../../Pages/Main.jsx";
import {adminRoutes, usersRoutes} from "../../router/index.jsx";
const AppRouter = () => {
    const [admin, setAdmin] = useContext(Admin);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('admin')) {
            const localAuth = JSON.parse(localStorage.getItem('admin'))
            if (localAuth.login === 'admin' && localAuth.password === 'admin') {
                setAdmin(true)
            }
        }
        setIsLoading(false)
    }, []);
    if (isLoading) {
        return
    }
    return (
        <Routes>
            <Route path="/" element={<Main/>}>
                {admin ? adminRoutes.map((item, index) => {
                    item = {...item, key: index}
                    return item
                }) : usersRoutes.map((item, index) => {
                    item = {...item, key: index}
                    return item
                })}
            </Route>
        </Routes>
    );
};

export default AppRouter;