import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './css/RestaurantCard.css';

function RestaurantCard({ restaurant }) {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth);

    function rating_stars(rating) {
        let rating_string = '';
        if (rating < 0) {
            rating = 0;
        }
        if (rating > 5) {
            rating = 5;
        }
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                rating_string += '★';
            } else {
                rating_string += '☆';
            }
        }
        return rating_string;
    }
    return (
        <div className="restaurant-card" key={restaurant.id}>
            <img src={restaurant.main_image} alt={restaurant.name} className="restaurant-card-image" />
            <div className="restaurant-card-info">
                <div className="restaurant-card-header">
                    <h3 className="restaurant-card-name">{restaurant.name}</h3>
                    <div className="restaurant-card-rating"><span className="star">{rating_stars(Number(restaurant.rating))}</span></div>
                </div>
                <p className="restaurant-card-description">{restaurant.description}</p>
                <p className="restaurant-card-location"><span className="location-icon">📍</span>{restaurant.address}</p>
                <div className="restaurant-card-actions">
                    <Link to={user ? `/reservation/${restaurant.id}` : '/login'} className="btn-card btn-card-primary">Réserver</Link>
                    <Link to={`/restaurant/detail/${restaurant.id}`} className="btn-card btn-card-secondary">Voir</Link>
                </div>
            </div>
        </div >
    );
}
export default RestaurantCard;