import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../../features/reservations/reservationSlice';
import Spinner from "../../components/widgets/Spinner"

import ProfileReservationCard from "./ProfileReservationCard";
import SearchBar from "../../components/widgets/SearchBar";
function ProfileReservationList() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { reservations, isLoading, isError, isSuccess, message } = useSelector((state) => state.reservations);
    useEffect(() => {
        if (user && user.access) {
            dispatch(fetchReservations(user.access));
        }
    }, [dispatch, user]);


    if (isLoading || !reservations) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }
    return (
        <>
            <div className="reservations">
                <div className="reservation-container">
                    <div className="searchbar-reservation-container">
                        <SearchBar />
                    </div>

                    <h2 className="list-header">Mes réservations actuelles</h2>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error: {message}</p>}
                    {isSuccess && (
                        reservations.map((reservation) => (
                            <ProfileReservationCard key={reservation.id} reservation={reservation} />))
                    )
                    }
                    {reservations.length == 0 && <div className=' no-menu'> Aucune reservation en cours </div>}
                </div>

            </div >
        </>
    );
}

export default ProfileReservationList;
