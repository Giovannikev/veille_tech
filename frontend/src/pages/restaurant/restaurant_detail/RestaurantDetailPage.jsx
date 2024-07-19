import React, { useEffect, useState } from 'react';
import RestaurantDetailHeader from "./RestaurantDetailHeader";
import InfoResto from "./InfoResto";
import DayButton from "./DayButton";
import MenuList from "./MenuList";
import Spinner from "../../../components/widgets/Spinner";
import { BiSolidDish } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../../features/restaurants/restaurantSlice';
import { getMenusByRestaurantId } from '../../../features/menus/menuSlice';
import { useParams } from 'react-router-dom';

import "./css/DishCard.css";
import "./css/MenuList.css";
import "./css/InfoResto.css";
import "./css/DayButton.css";
import "./css/RestaurantDetailHeader.css";
import '../../../components/widgets/css/FadeInSection.css';

function RestaurantDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { restaurant, isLoading: restaurantLoading, isError: restaurantError, message: restaurantMessage } = useSelector(
        (state) => state.restaurants
    );
    const { menus, isLoading: menusLoading, isError: menusError, message: menusMessage } = useSelector(
        (state) => state.menus
    );
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        dispatch(getRestaurantById(id));
        dispatch(getMenusByRestaurantId(id));
    }, [dispatch, id]);

    if (restaurantLoading || menusLoading) {
        return <Spinner />;
    }

    if (restaurantError) {
        return <div>Error: {restaurantMessage}</div>;
    }

    if (menusError) {
        return <div>Error: {menusMessage}</div>;
    }
    const filterMenusByDay = (day) => {
        setSelectedDay(day);
    };
    const filteredMenus = menus.filter(menu => {
        return menu.available_days.includes(selectedDay);
    });
    return (
        <>
            {restaurant && <RestaurantDetailHeader restaurant={restaurant} />}
            <DayButton onSelectDay={filterMenusByDay} />
            {filteredMenus.length > 0 ? (
                filteredMenus.map((menu, index) => (
                    <MenuList key={index} cards={menu.dishes} category={menu.category} name={menu.name} />
                ))
            ) : (
                <div className='no-menu'>Aucun menu<br /> pour ce jour, désolé.</div >
            )
            }
            <InfoResto restaurant={restaurant} />
        </>
    );
}

export default RestaurantDetailPage;
