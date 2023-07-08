import {createContext, useState} from "react";

export const Products = createContext(null);
export const BasketProduct = createContext(null);

export const Admin = createContext(null);
export const AdminComponent = (props) => {
    const [admin, setAdmin] = useState(false)
    return (
        <Admin.Provider value={[admin, setAdmin]}>
            {props.children}
        </Admin.Provider>
    )
}