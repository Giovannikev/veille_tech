import React from "react";
function TicketInfoRestaurant({ restaurant }) {
    return (
        <div className="ticket-restaurant-info">
            <h2 className="ticket-info-title">Informations Restaurant</h2>
            <p className="ticket-info-item"><strong>Adresse:</strong> {restaurant.address}</p>
            <p className="ticket-info-item"><strong>Téléphone:</strong>{restaurant.phone_number}</p>
            <p className="ticket-info-item"><strong>Cuisine:</strong> {restaurant.speciality}</p>
            <p className="ticket-info-item"><strong>Parking:</strong> Disponible à proximité</p>
        </div>
    );
}
export default TicketInfoRestaurant;