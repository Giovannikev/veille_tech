import "./css/Formulaire.css";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux';
import { addNewReservation } from '../../features/reservations/reservationSlice';
import { getRestaurantById } from '../../features/restaurants/restaurantSlice';
import { fetchAvailableTables } from '../../features/tables/tableSlice';
import { useParams } from "react-router-dom";
import TableSelection from "./TableSelection";
import Spinner from "../../components/widgets/Spinner";
import axios from "axios";
import "./css/TableSelection.css"

export default function ReservationFormulaire() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState("");
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);


    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { restaurant, isLoading: restaurantLoading, isError: restaurantError, message: restaurantMessage } = useSelector(
        (state) => state.restaurants
    );
    const { userInfo } = useSelector(state => state.auth);
    const user = useSelector((state) => state.auth.user);
    var configs = {
        headers: {
            "Authorization": `Bearer ${user.access}`,
        },
    }

    const userFullName = userInfo.first_name + ' ' + userInfo.last_name;

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantById(id));
        }
    }, [dispatch, id]);



    const [formData, setFormData] = useState({
        restaurant: id,
        customer: userInfo.id,
        table: null,
        occasion: 'solo',
        special_requests: '',
    });

    useEffect(() => {
        if (date) {
            axios.get(`http://localhost:8000/table/available/api/1/2024-10-10/`)
                .then(response => {
                    setTables(response.data);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des tables disponibles:', error);
                });
        }
    }, [date, id]);


    const handleTableSelect = (table) => {
        setFormData({
            ...formData,
            table: table.id
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/reservation/list/api/`, {
            ...formData,
            reservation_date: date,
            reservation_time: time,
        }, configs)
            .then(response => {
                toast.success("Réservation réussie");

                navigate("/")
            })
            .catch(error => {
                console.error('Erreur lors de la création de la réservation:', error);
            });
    };
    if (restaurantLoading || !restaurant) {
        return <Spinner />;
    }
    if (restaurantError) {
        return <div>Error: {restaurantMessage}</div>;
    }
    return (

        <>
            <img className="w-full h-52 reservation-image" src={restaurant.main_image} alt="Couverture" />
            <div className="reservation-form">
                <div>
                    <h1 className="reservation-title ">{restaurant.name}</h1>
                    <p className="reservation-subtitle">Découvrez l'excellence culinaire au cœur de la ville</p>
                </div>

                <section >
                    <form id="reservationForm" onSubmit={handleSubmit}>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="fullName">Nom complet :</label>
                            <input type="text" id="fullName" name="fullName" value={userFullName} disabled required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="email" >Email :</label>
                            <input type="email" id="email" name="email" value={userInfo.email} disabled required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="phone">Numéro de téléphone :</label>
                            <input type="tel" id="phone" name="phone" value={userInfo.phone} placeholder="+261 34 56 789 01" required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="reservation_date">Date de réservation :</label>
                            <input type="date" id="reservation_date" name="reservation_date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="reservation_time">Heure de réservation :</label>
                            <input type="time" id="reservation_time" name="reservation_time" value={time} onChange={(e) => setTime(e.target.value)} required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="occasion">Occasion spéciale (optionnel) :</label>
                            <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                                <option value="">Sélectionnez une occasion</option>
                                <option value="solo">Simple repas</option>
                                <option value="birthday">Anniversaire</option>
                                <option value="anniversary">Dîner familial</option>
                                <option value="business">Dîner d'affaires</option>
                                <option value="rdv">Dîner en amoureux</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="specialRequests">Demandes spéciales (optionnel) :</label>
                            <textarea id="specialRequests" placeholder="Ajoutez ici vos demandes spéciales..."
                                className="w-full h-52 " value={formData.special_requests} name="special_requests" onChange={handleChange}></textarea></div>
                        <div className="reservation-form-group">
                            <TableSelection handleTableSelect={handleTableSelect} availableTables={tables} />
                        </div>
                        <div className="button-form-centered">
                            <input type="submit" className="sm-button button-bg " value="Réserver une table" onClick={handleSubmit} />
                        </div>
                    </form>
                </section>
            </div>
        </ >
    );
}

export function Section() {
    return (
        <div className="section">
            <section className="reservation-info-section">
                <h2>Instructions de réservation</h2>
                <ol>
                    <li>Remplissez le formulaire de réservation avec toutes les informations requises.</li>
                    <li>Choisissez une date et une heure au moins 24 heures à l'avance.</li>
                    <li>Soumettez le formulaire et attendez un email de confirmation (généralement dans les 2 heures).</li>
                    <li>Si vous ne recevez pas de confirmation, veuillez vérifier votre dossier de spam ou nous contacter directement.</li>
                </ol>
            </section>

            <section className="info-section">
                <h2>Coordonnées</h2>
                <p>Adresse : 123 Rue Gourmet, Ville Gourmande, CG 12345</p>
                <p>Téléphone : (555) 123-4567</p>
                <p>Email : <a href="/cdn-cgi/l/email-protection" className="__cf_email__"
                    data-cfemail="abd9ced8ced9ddcafdd0d6d7cac98ed9d7d5">[email&#160;protected]</a></p>
                <h3>Heures d'ouverture :</h3>
                <ul>
                    <li>Lundi - Jeudi : 17h00 - 22h00</li>
                    <li>Vendredi - Samedi : 17h00 - 23h00</li>
                    <li>Dimanche : 16h00 - 21h00</li>
                </ul>
            </section>

            <section className="info-section">
                <h2>Politique de réservation</h2>
                <ul>
                    <li>Les réservations doivent être effectuées au moins 24 heures à l'avance.</li>
                    <li>Pour les groupes de 6 personnes ou plus, veuillez nous appeler directement pour organiser votre réservation.</li>
                    <li>Nous conserverons votre table pendant 15 minutes après l'heure de réservation avant de la libérer.</li>
                    <li>Les annulations doivent être effectuées au moins 4 heures avant l'heure de la réservation pour éviter des frais d'annulation.</li>
                    <li>Les demandes spéciales (exigences alimentaires, célébrations spéciales) doivent être mentionnées dans le formulaire de réservation ou communiquées directement à notre personnel.</li>
                </ul>
            </section>
        </div>
    );
}
