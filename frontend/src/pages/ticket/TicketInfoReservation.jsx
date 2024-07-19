import React from "react";
function TicketInfoResevation({ reservation }) {
    const restaurantImage = `http://127.0.0.1:8000/media/${reservation.restaurant_image}`;

    return (
        <>

            <img src={restaurantImage} alt="La Table d'Or" className="ticket-cover-image" />
            <div className="ticket-top">
                <div className="ticket-left">
                    <img src={reservation.qr_code} alt="QR Code" className="ticket-qr-code" />
                </div>
                <div className="ticket-right">
                    <div className="ticket-reservation-info-container">
                        <h1 className="ticket-restaurant-name">{reservation.restaurant_name}</h1>
                        <div className="ticket-reservation-details">

                            <div className="ticket-detail-item">
                                <strong>Date</strong>
                                {reservation.reservation_date}
                            </div>
                            <div className="ticket-detail-item">
                                <strong>Heure</strong>
                                {reservation.reservation_time}
                            </div>
                            <div className="ticket-detail-item">
                                <strong>Table</strong>
                                {reservation.table_id}
                            </div>

                            <div className="ticket-detail-item">
                                <strong>Réservation</strong>
                                {reservation.id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TicketInfoResevation;