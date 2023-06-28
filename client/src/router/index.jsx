import {Navigate, Route} from "react-router-dom";
import Catalog from "../Pages/Catalog/Catalog.jsx";
import ProductPage from "../Pages/ProductPage.jsx";

export const myRoutes = [
    <Route index element={<Catalog/>}></Route>,
    <Route path="catalog/:id" element={<ProductPage/>}></Route>,
    <Route path="*" element={<Navigate to='catalog'/>}></Route>
]