import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchReservations } from '../../features/reservations/reservationSlice';

import './css/SearchBar.css';
const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const handleSearch = () => {
        if (query.trim() !== '') {
            dispatch(searchReservations(query));
        } else {
            dispatch(searchReservations(''));
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Rechercher..."
                onChange={(e) => setQuery(e.target.value)}
                onFocus={(e) => (e.target.style.boxShadow = 'inset 0 0 0 2px #3498db')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
            />

            <button className="search-button" onClick={handleSearch}>
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
            </button>

        </div>
    );
};

export default SearchBar;
/*
<select
                className="search-filter"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
            >
                <option value="all">Tous</option>
                <option value="popularity">Popularité</option>
                <option value="rating">Note</option>
                <option value="speciality">Spécialité</option>
            </select> */