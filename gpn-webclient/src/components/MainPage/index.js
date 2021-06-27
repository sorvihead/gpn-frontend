import TableTabs from '../TableTabs';
import './MainPage.scss';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FilterContext } from '../../context';

const MainPage = () => {
    const {state, dispatch } = useContext(FilterContext);
    const [fetchedWells, setWells] = useState();
    const [fetchedFacilities, setFacilities] = useState();
    useEffect(() => {
        const facilitiesUrl = '/api/facilities?statuses=Выпущено,Доставка на базу,Необходимо подготовить,Ремонт/списание,Демонтаж';
        axios.get(facilitiesUrl).then((resp) => {
            const facilities = resp.data.facilities;
            setFacilities(facilities);
            dispatch({type: 'SET_FACILITIES', payload: facilities});
        });
        const wellsUrl = '/api/wells'
        axios.get(wellsUrl).then((resp) => {
            const wells = resp.data.wells;
            setWells(wells);
            dispatch({type: 'SET_WELLS', payload: wells});
        })
    }, [setFacilities, setWells]);
    return (
        <div className="main-page">
            <TableTabs />
        </div>
    )
}

export default MainPage;