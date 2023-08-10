import React, {useRef} from 'react';
import cl from './FilterOrders.module.scss';
import './transitionFilter.scss';
import {CSSTransition} from "react-transition-group";
const FilterOrders = ({isOpenFilter, settings, admin}) => {
    const refFilter = useRef(null);
    const [filtersOrders, setFiltersOrders] = settings;
    const changeFilter = (title, name, checked) => {
        const index = filtersOrders.findIndex(filter => filter.title === title);
        let changedFilters = [...filtersOrders];
        if (!checked) {
            changedFilters = changedFilters.map(filter => {
                if (filter.name === name) {
                    return {...filter, checked: false}
                } else {
                    return filter
                }
            })
        }
        if (admin) {
            changedFilters[index].checked = !changedFilters[index].checked;
        } else {
            changedFilters[index].checked = true;
        }
        setFiltersOrders(changedFilters);
        if (admin) {
            const filtersObject = changedFilters.filter(filter => filter.checked);
            const strFiltersObject = JSON.stringify(filtersObject);
            localStorage.setItem('filter', strFiltersObject)
        }
    }
    return (
        <CSSTransition
            nodeRef={refFilter}
            in={isOpenFilter}
            className="filter"
            timeout={300}
            unmountOnExit
        >
            <div ref={refFilter}>
                <div className={cl.filter}>
                    {filtersOrders.map(filter => (
                        <div key={filter.title} className={cl.item} onClick={() => changeFilter(filter.title, filter.name, filter.checked)}><div className={`${cl.dot} ${filter.checked ? cl.selected : ''}`}></div><h4>{filter.title}</h4></div>
                    ))}
                </div>
            </div>
        </CSSTransition>
    );
};

export default FilterOrders;