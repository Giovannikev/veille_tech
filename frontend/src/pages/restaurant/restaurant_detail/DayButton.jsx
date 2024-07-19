import React, { useState, useEffect } from 'react';

function DayButton({ onSelectDay }) {
    const days = { 'Monday': "MO", 'Tuesday': 'TU', 'Wednesday': "WE", 'Thursday': "TH", 'Friday': "FR", 'Saturday': "SA", 'Sunday': "SU" };
    const dayNames = Object.keys(days);
    const [activeDay, setActiveDay] = useState('');

    useEffect(() => {
        const today = new Date().getDay();
        setActiveDay(days[dayNames[today]]);
    }, []);

    const handleDayClick = (day, index) => {
        setActiveDay(day);
        onSelectDay(day);
    };

    return (
        <div>
            <h2 className='menu-title'>Notre menu</h2>

            <div className="week-container">
                {dayNames.map((day, index) => (
                    <button
                        key={day}
                        className={`day-button ${activeDay === days[day] ? 'active' : ''}`}
                        onClick={() => handleDayClick(days[day], index)}
                    >
                        {days[day]}
                    </button>
                ))}
            </div>
        </div>
    );
}
export default DayButton;