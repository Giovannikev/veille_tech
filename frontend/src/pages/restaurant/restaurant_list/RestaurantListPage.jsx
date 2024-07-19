import React from "react";
import SecondaryBanner from "./SecondaryBanner";
import SearchbarRestaurant from "../../../components/widgets/SearchbarRestaurant";
import RestaurantList from "./RestaurantList";
import './css/SecondaryBanner.css'
import ChatBot from "../../chatbot/Chatbot";
function RestaurantListPage() {
    return (
        <div className="background-color">
            <SecondaryBanner />
            <SearchbarRestaurant />
            <RestaurantList />
            <ChatBot />

        </div>
    )
}
export default RestaurantListPage; 