import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../features/restaurants/restaurantSlice';
import { useParams } from "react-router-dom";

import RestaurantService from "./RestaurantServices/RestaurantService";
import RestaurantStatistics from "./RestaurantStatistics/RestaurantStatistics";
import RestaurantInfo from "./RestaurantInfo/RestaurantInfo";
import Spinner from "../../components/widgets/Spinner";
function DashboardPage() {
    const { id } = useParams()
    const [activeSection, setActiveSection] = useState("service");
    const { restaurant, isLoading: restaurantLoading, isError: restaurantError, message: restaurantMessage } = useSelector(
        (state) => state.restaurants
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRestaurantById(id));
    }, [dispatch, id]);

    if (restaurantLoading || !restaurant) {
        return <Spinner />;
    }

    if (restaurantError) {
        return <div>Error: {restaurantMessage}</div>;
    }
    return (
        <>
            <img src={restaurant.main_image} alt="Couverture du profil" className="profile-cover-photo" />

            <div className="statistics-container">
                <h1 className="dashboard-header">Dashboard {restaurant.name}</h1>
                <div className="buttons-container-dashboard">
                    <button onClick={() => setActiveSection("service")}>Service</button>
                    <button onClick={() => setActiveSection("statistics")}>Statistiques</button>
                    <button onClick={() => setActiveSection("info")}>Infos</button>
                </div>
                {activeSection === "service" && <RestaurantService restaurantId={id} />}
                {activeSection === "statistics" && <RestaurantStatistics restaurantId={id} />}
                {activeSection === "info" && <RestaurantInfo restaurant={restaurant} />}

            </div>
        </>
    );
}

export default DashboardPage;
