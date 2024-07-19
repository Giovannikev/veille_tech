import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../features/restaurants/restaurantSlice';
import { deleteExistingReservation } from '../../features/reservations/reservationSlice';

import Spinner from "../../components/widgets/Spinner"

function ProfileReservationCard({ reservation }) {
    // handle caroussel
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    // get data 
    const dispatch = useDispatch();
    const restaurantImage = `http://127.0.0.1:8000/media/${reservation.restaurant_image}`;
    const { restaurant, isLoading: restaurantLoading, isError: restaurantError, message: restaurantMessage } = useSelector(
        (state) => state.restaurants
    );
    const user = useSelector((state) => state.auth.user);
    // set state for ticket
    const navigate = useNavigate();
    const handleViewTicket = () => {
        navigate('/ticket', { state: { reservation, restaurant } });
    };

    useEffect(() => {
        dispatch(getRestaurantById(reservation.restaurant));
    }, [dispatch, reservation.restaurant]);

    if (restaurantLoading) {
        return <Spinner />;
    }
    if (restaurantError || !restaurant) {
        return <div>Error: {restaurantMessage}</div>;
    }

    // deleting restaurant reservation
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            dispatch(deleteExistingReservation({ id, accessToken: user.access }));
        }
    };

    return (
        <>
            <div ref={inViewRef} className={`reservation-card fade-in-section ${inView ? 'is-visible' : ''}`}>
                <img src={restaurantImage} alt={reservation.restaurant_name} className="restaurant-reservation-image" />
                <div className="reservation-details">
                    <h3>{reservation.restaurant_name}</h3>
                    <div className="reservation-info">
                        <p>{reservation.occasion}</p>
                        <p>Date: {reservation.reservation_date} à {reservation.reservation_time}</p>
                        <p>Numéro de table: {reservation.table}</p>
                    </div>
                    <div className="reservation-actions">
                        <button onClick={() => handleDelete(reservation.id)} className="btn-reservation btn-reservation-danger">Annuler</button>
                        {/*<button className="btn-reservation btn-reservation-primary">Modifier</button>*/}
                        <button onClick={handleViewTicket} className="btn-reservation btn-reservation-primary">Voir le ticket</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileReservationCard;
