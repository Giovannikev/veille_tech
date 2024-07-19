import React, { useState, useEffect } from 'react';
import './css/Calendar.css';

const events = {
    '2023-06-05': "Réunion d'équipe à 14h",
    '2023-06-12': "Déjeuner d'affaires à 12h30",
    '2023-06-20': "Présentation du projet à 10h",
    '2023-06-28': "Formation en ligne à 9h"
};

const Calendar = ({ onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        updateCalendar();
    }, [currentDate]);

    const updateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthYear = document.getElementById('monthYear');
        monthYear.textContent = new Date(year, month, 1).toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

        const daysContainer = document.getElementById('daysContainer');
        daysContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div class="empty"></div>';
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;

            if (year === new Date().getFullYear() && month === new Date().getMonth() && i === new Date().getDate()) {
                dayDiv.classList.add('today');
            }

            dayDiv.addEventListener('click', () => showDayInfo(year, month, i));
            daysContainer.appendChild(dayDiv);
        }
    };

    const showDayInfo = (year, month, day) => {
        const date = new Date(year, month, day);
        const dateInfo = `Date sélectionnée : ${date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

        const eventKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const eventInfo = events[eventKey] ? `Événement : ${events[eventKey]}` : "Aucun événement prévu pour ce jour.";

        const infoPanel = document.getElementById('infoPanel');
        infoPanel.style.display = 'block';

        // Appel de la fonction de rappel pour envoyer la date sélectionnée
        onDateSelect(date.toISOString().split('T')[0]);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button id="prevMonth" onClick={handlePrevMonth}>&lt;</button>
                <span id="monthYear"></span>
                <button id="nextMonth" onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="weekdays">
                <div>Dim</div>
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Jeu</div>
                <div>Ven</div>
                <div>Sam</div>
            </div>
            <div className="days" id="daysContainer"></div>
            <div className="info-panel" id="infoPanel">
                <h3>Informations du jour</h3>
                <p id="dateInfo"></p>
                <p id="eventInfo"></p>
            </div>
        </div>
    );
};

export default Calendar;
