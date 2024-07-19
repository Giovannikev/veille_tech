import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'

import Select from 'react-select';
import axios from "axios";

import ImageUploader from './ImageUploader';


export default function RestaurantFormulaire() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const user = useSelector((state) => state.auth.user);
    const userFullName = userInfo.first_name + ' ' + userInfo.last_name;
    const [selectedDays, setSelectedDays] = useState([]);
    const navigate = useNavigate()

    const DAYS_OF_WEEK = [
        { value: 'MO', label: 'Lundi' },
        { value: 'TU', label: 'Mardi' },
        { value: 'WE', label: 'Mercredi' },
        { value: 'TH', label: 'Jeudi' },
        { value: 'FR', label: 'Vendredi' },
        { value: 'SA', label: 'Samedi' },
        { value: 'SU', label: 'Dimanche' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        phone_number: '',
        website_link: '',
        social_media_link: '',
        email: '',
        capacity: '',
        services: '',
        accessibility: '',
        parking: false,
        opening_time: '',
        closing_time: '',
        opening_days: [],
        speciality: '',
        main_image: null,
        rating: 0,
        owner_id: userInfo.id,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleDaysChange = (selectedOptions) => {
        const days = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedDays(days);
        setFormData(prevState => ({ ...prevState, opening_days: days }));
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            main_image: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        axios.post('http://localhost:8000/restaurant/create/api/', data)
            .then(_ => {
                navigate("/plans")
            })
            .catch(error => {
                toast.error(`Erreur lors de l\'inscription: ${error}`);
            });
        setSelectedDays([]);

    };


    return (

        <div className='restaurant-form '>
            <div className="reservation-form">
                <div>
                    <h1 className="reservation-title ">Inscription restaurant</h1>
                    <p className="reservation-subtitle">Faites découvrir votre talent culinaire au monde</p>
                </div>

                <section >
                    <form id="reservationForm" onSubmit={handleSubmit}>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="name">Nom du Restaurant:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="description" >Description:</label>
                            <textarea id="specialRequests" placeholder="Un restaurant qui sert de la bonne nourriture ..."
                                className="w-full h-52 " value={formData.description} name="description" onChange={handleChange}>
                            </textarea>
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="services">Services:</label>
                            <textarea id="specialRequests" placeholder="Un restaurant qui sert de la bonne nourriture ..."
                                className="w-full h-52 " value={formData.services} name="services" onChange={handleChange}>
                            </textarea>
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="address">Adresse :</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="phone_number">Numéro de téléphone:</label>
                            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="website_link">Site Web:</label>
                            <input type="url" name="website_link" value={formData.website_link} onChange={handleChange} />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="social_media_link">Lien de réseaux sociaux:</label>
                            <input type="url" name="social_media_link" value={formData.social_media_link} onChange={handleChange} />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="email">Email restaurant:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="capacity">Capacité:</label>
                            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
                        </div>

                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="accessibility">Accessibilité:</label>
                            <input type="text" name="accessibility" value={formData.accessibility} onChange={handleChange} />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="parking">Parking:</label>
                            <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="opening_time">Heure d'ouverture:</label>
                            <input type="time" name="opening_time" value={formData.opening_time} onChange={handleChange} required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="closing_time">Heure de fermeture:</label>
                            <input type="time" name="closing_time" value={formData.closing_time} onChange={handleChange} required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="opening_days">Jours d'ouverture:</label>
                            <Select
                                options={DAYS_OF_WEEK}
                                isMulti
                                onChange={handleDaysChange}
                                value={DAYS_OF_WEEK.filter(option => selectedDays.includes(option.value))}
                            />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="speciality">Spécialité:</label>
                            <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} required />
                        </div>
                        <div className="reservation-form-group">
                            <label className="reservation-label" htmlFor="main_image">Image :</label>
                            <input type="file" name="main_image" onChange={handleFileChange} />
                        </div>
                        <ImageUploader />
                        <div className="button-form-centered">
                            <input type="submit" className="sm-button button-bg " value="Ajourer votre restaurant" onClick={handleSubmit} />
                        </div>
                    </form>
                </section>
            </div >
        </ div>
    );
}
