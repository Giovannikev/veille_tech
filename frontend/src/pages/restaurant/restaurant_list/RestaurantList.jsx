import React, { useEffect } from "react";
import RestaurantCard from "../RestaurantCard";
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../../../features/restaurants/restaurantSlice';

import Spinner from "../../../components/widgets/Spinner";
function RestaurantList() {
    const dispatch = useDispatch();
    const { restaurants, searchResults, isLoading, isError, message } = useSelector(
        (state) => state.restaurants
    );
    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);

    if (isLoading || !restaurants) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }
    const resultsToDisplay = searchResults.length > 0 ? searchResults : restaurants;
    return (
        <>

            <div className="sections background-color">
                <h2 className="list-header">Tous les restaurants</h2>
                <div className="restaurant-list">
                    {resultsToDisplay.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </>
    );
}
export default RestaurantList; 