import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Calendar from './Calendar';
import TableSelection from '../../reservation/TableSelection';

import './css/RestaurantStatistics.css';
import 'chart.js/auto';
function RestaurantStatistics({ restaurantId }) {
    const [reservations, setReservations] = useState([]);
    const [reservationsByDayChart, setReservationsByDayChart] = useState(null);
    const [reservationsToday, setReservationsToday] = useState(0);
    const [totalReservations, setTotalReservations] = useState(0);
    const [futureReservations, setFutureReservations] = useState(0);
    const [creationData, setCreationData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('2024-10-10');
    const [occupationData, setOccupationData] = useState(null);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const BACKEND_URL = "http://127.0.0.1:8000/reservation";
    const config = {
        headers: {
            "Authorization": `Bearer ${user.access}`,
        },
    };

    useEffect(() => {
        if (selectedDate) {
            fetchOccupationData();
        }
    }, [selectedDate]);

    useEffect(() => {
        if (restaurantId) {
            fetchCreationData();
            fetchReservationsToday();
            fetchTotalReservations();
            fetchFutureReservations();
            fetchReservations();
            fetchReservationsByDay();
            fetchAvailableTables();
        }
    }, [restaurantId]);

    const fetchOccupationData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/table-occupation-rate/${restaurantId}/${selectedDate}/`, config);
            const { occupied, unoccupied } = response.data;
            setOccupationData({
                labels: ['occupé', 'non occupé'],
                datasets: [{
                    data: [occupied, unoccupied],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                    ]
                }]
            });
        } catch (error) {
            console.error('Error fetching occupation data:', error);
        }
    };
    const fetchAvailableTables = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/table/available/api/${restaurantId}/${selectedDate}/`, config);
            setAvailableTables(response.data);
        } catch (error) {
            console.error('Error fetching available tables:', error);
        }
    };
    const fetchCreationData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/reservation-counts-by-creation-date/${restaurantId}/`, config);
            const { labels, counts } = response.data;
            setCreationData({
                labels: labels,
                datasets: [{
                    label: 'Réservations',
                    data: counts,
                    backgroundColor: 'rgba(52, 152, 219, 0.8)'
                }]
            });
        } catch (error) {
            console.error('Error fetching creation data:', error);
        }
    };

    const fetchReservationsToday = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/reservations-today-count/api/${restaurantId}/`, config);
            setReservationsToday(response.data.count);
        } catch (error) {
            console.error('Error fetching reservations today:', error);
        }
    };

    const fetchTotalReservations = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/total-reservations-count/api/${restaurantId}/`, config);
            setTotalReservations(response.data.count);
        } catch (error) {
            console.error('Error fetching total reservations:', error);
        }
    };

    const fetchFutureReservations = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/future-reservations-count/api/${restaurantId}/`, config);
            setFutureReservations(response.data.count);
        } catch (error) {
            console.error('Error fetching future reservations:', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/admin/list/api/${restaurantId}/`, config);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const fetchReservationsByDay = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/count-by-day/api/${restaurantId}/`, config);
            const { labels, counts } = response.data;
            setReservationsByDayChart({
                labels: labels,
                datasets: [
                    {
                        label: 'Nombre de réservations par jour',
                        data: counts,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleTableSelect = (table) => {
        setSelectedTable(table);
    };

    const options = {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    };

    const donutOptions = {
        responsive: false,
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    };

    return (
        <div>
            <div className="statistics-container">
                <Calendar onDateSelect={handleDateChange} />
            </div>
            <div className="statistics-container">
                <div className="statistics-dashboard">
                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Réservations d'aujourd'hui</h3>
                        <div className="statistics-stat">{reservationsToday}</div>
                    </div>
                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Réservations en cours</h3>
                        <div className="statistics-stat">{totalReservations}</div>
                    </div>
                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Réservations totales</h3>
                        <div className="statistics-stat">{futureReservations}</div>
                    </div>

                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Réservations par jour</h3>
                        {creationData && <Line data={creationData} options={options} />}
                    </div>
                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Places reservées</h3>
                        {reservationsByDayChart && <Bar data={reservationsByDayChart} options={options} />}
                    </div>
                    <div className="statistics-card">
                        <h3 className='dashboard-card-title'>Taux d'occupation</h3>
                        {occupationData && <Doughnut data={occupationData} options={donutOptions} />}
                    </div>
                </div>
            </div>

            <div className="statistics-container">
                <div className="statistics-card">
                    <h3 className='dashboard-card-title'>Réservations récentes</h3>
                    <table className='statistics-table scrollable-table'>
                        <thead>
                            <tr>
                                <th className='statistics-th'>Nom</th>
                                <th className='statistics-th'>Date</th>
                                <th className='statistics-th'>Heure</th>
                                <th className='statistics-th'>Invités</th>
                                <th className='statistics-th'>Table</th>
                                <th className='statistics-th'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td className='statistics-td'>{reservation.customer_first_name}</td>
                                    <td className='statistics-td'>{reservation.reservation_date}</td>
                                    <td className='statistics-td'>{reservation.reservation_time}</td>
                                    <td className='statistics-td'>{reservation.nb_personne}</td>
                                    <td className='statistics-td'>{reservation.table_id}</td>
                                    <td className='statistics-td'>{reservation.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="statistics-container">
                <div className="statistics-card">
                    <h3 className='dashboard-card-title'>Tables</h3>

                    <TableSelection handleTableSelect={handleTableSelect} availableTables={availableTables} />
                </div>
            </div>

        </div>
    );
}

export default RestaurantStatistics;
