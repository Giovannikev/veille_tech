import React from "react";
import { useLocation } from 'react-router-dom';
import TicketInfoResevation from "./TicketInfoReservation";
import TicketInfoRestaurant from "./TicketInfoRestaurant";
import html2pdf from 'html2pdf.js';
import "./css/TicketPage.css"

function TicketPage() {
    // generate pdf for downloading ticket
    const generatePDF = () => {
        const element = document.getElementById('ticket');
        html2pdf().from(element).save('ticket.pdf');
    };

    // get info restaurant and reservation from state
    const location = useLocation();
    const { reservation, restaurant } = location.state;
    if (!reservation || !restaurant) {
        return <div>Erreur : Aucune réservation trouvée.</div>;
    }

    return (
        <div className="ticket-page">
            <div className="ticket-container" id="ticket">
                <div className="ticket ">
                    <TicketInfoResevation reservation={reservation} />
                    <TicketInfoRestaurant restaurant={restaurant} />
                </div>
            </div>
            <a className="sm-button button-bg button-ticket" onClick={generatePDF}>Télécharger en PDF</a>
        </div>
    );
}
export default TicketPage;