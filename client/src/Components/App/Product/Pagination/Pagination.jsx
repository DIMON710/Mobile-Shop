import React from 'react';
import cl from "./Pagination.module.scss";
import {useNavigate} from "react-router-dom";

const Pagination = ({currentPage, totalPage}) => {
    const navigate = useNavigate();
    const pages = [];
    for (let i = 0; i < totalPage; i++) {
        pages.push(i+1);
    }
    return (
        <div className={cl.wrapper}>
            {pages.map((page) => (
                <button key={page} onClick={() => navigate(`/${page}`)} style={page == currentPage ? {borderColor: '#646cff'} : {}} className={cl.pagination}>{page}</button>
            ))}
        </div>
    );
};

export default Pagination;