import {Navigate, Route} from "react-router-dom";
import Catalog from "../Pages/Catalog/Catalog.jsx";
import ProductPage from "../Pages/ProductPage.jsx";
import Orders from "../Pages/Orders.jsx";
import AdminAuth from "../Pages/AdminAuth.jsx";

export const myRoutes = [
    <Route index element={<Catalog/>}></Route>,
    <Route path="/:page" element={<Catalog/>}></Route>,
    <Route path="admin" element={<AdminAuth/>}></Route>,
    <Route path="orders" element={<Navigate to='/admin'/>}></Route>,
    <Route path="orders/:page" element={<Navigate to='/admin'/>}></Route>,
    <Route path="product/:id" element={<ProductPage/>}></Route>,
    <Route path="*" element={<Navigate to='catalog'/>}></Route>
]
export const adminRoutes = [
    <Route index element={<Catalog/>}></Route>,
    <Route path="/:page" element={<Catalog/>}></Route>,
    <Route path="orders" element={<Navigate to='/orders/1'/>}></Route>,
    <Route path="orders/:page" element={<Orders/>}></Route>,
    <Route path="product/:id" element={<ProductPage/>}></Route>,
    <Route path="*" element={<Navigate to='/catalog'/>}></Route>
]