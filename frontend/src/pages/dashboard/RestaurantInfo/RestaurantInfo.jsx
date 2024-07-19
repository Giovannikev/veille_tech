import React, { useState } from "react";
import "./css/RestaurantInfo.css"
function RestaurantInfo({ restaurant }) {
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [currentEditField, setCurrentEditField] = useState('');
    const [currentEditValue, setCurrentEditValue] = useState('');
    const [restaurantInfo, setRestaurantInfo] = useState({
        name: restaurant.name,
        cuisine: restaurant.speciality,
        email: restaurant.email,
        address: restaurant.address,
        phone: restaurant.phone_number,
        website_link: restaurant.website_link,
        opening_time: restaurant.opening_time,
        closing_time: restaurant.closing_time,
        opening_days: restaurant.opening_days,
        social_media_link: restaurant.social_media_link,
        description: restaurant.description,
        services: restaurant.services,
        accessibility: restaurant.accessibility,
        parking: restaurant.parking,
        chair: 60,
        table: 24,
        capacity: 16,
    });

    const toggleEdit = (field) => {
        setCurrentEditField(field);
        setCurrentEditValue(restaurantInfo[field]);
        setEditFormVisible(true);
    };

    const saveEdit = () => {
        setRestaurantInfo({
            ...restaurantInfo,
            [currentEditField]: currentEditValue,
        });
        setEditFormVisible(false);
    };

    return (
        <div>

            <div className="statistics-container">
                <div className="statistics-dashboard">
                    <div className="statistics-card">
                        <h3 className="dashboard-card-title info-card-title">Informations sur le restaurant</h3>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Nom</span>
                            <span className="editable" onClick={() => toggleEdit('name')}>{restaurantInfo.name}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Cuisine</span>
                            <span className="editable" onClick={() => toggleEdit('cuisine')}>{restaurantInfo.cuisine}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Email</span>
                            <span className="editable" onClick={() => toggleEdit('email')}>{restaurantInfo.email}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Téléphone</span>
                            <span className="editable" onClick={() => toggleEdit('phone')}>{restaurantInfo.phone}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Lien siteweb</span>
                            <span className="editable" onClick={() => toggleEdit('website_link')}>{restaurantInfo.website_link}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Lien réseaux sociaux</span>
                            <span className="editable" onClick={() => toggleEdit('social_media_link')}>{restaurantInfo.social_media_link}</span>
                        </div>
                    </div>
                    <div className="statistics-card">
                        <h3 className="dashboard-card-title info-card-title">Horaires et localisation</h3>

                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Jour d'ouverture</span>
                            <span className="editable" onClick={() => toggleEdit('opening_days')}>{restaurantInfo.opening_days}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Heure d'ouverture</span>
                            <span className="editable" onClick={() => toggleEdit('opening_time')}>{restaurantInfo.opening_time}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Heure de fermeture</span>
                            <span className="editable" onClick={() => toggleEdit('closing_time')}>{restaurantInfo.opening_time}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Adresse:</span>
                            <span className="editable" onClick={() => toggleEdit('address')}>{restaurantInfo.address}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Accessibilité:</span>
                            <span className="editable" onClick={() => toggleEdit('accessibility')}>{restaurantInfo.accessibility}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Parking:</span>
                            <span className="editable" onClick={() => toggleEdit('parking')}>{restaurantInfo.parking}</span>
                        </div>
                    </div>
                    <div className="statistics-card">
                        <h3 className="dashboard-card-title info-card-title">Description</h3>
                        <p className="editable" onClick={() => toggleEdit('description')}>{restaurantInfo.description}</p>
                    </div>
                    <div className="statistics-card">
                        <h3 className="dashboard-card-title info-card-title">Services</h3>
                        <p className="editable" onClick={() => toggleEdit('services')}>{restaurantInfo.services}</p>
                    </div>
                    <div className="statistics-card">
                        <h3 className="dashboard-card-title info-card-title">Capacité</h3>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Chaises:</span>
                            <span className="editable" onClick={() => toggleEdit('chair')}>{restaurantInfo.chair}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Tables:</span>
                            <span className="editable" onClick={() => toggleEdit('table')}>{restaurantInfo.table}</span>
                        </div>
                        <div className="dashboard-form-group">
                            <span className="dashboard-info-label">Capacité totale:</span>
                            <span className="editable" onClick={() => toggleEdit('capacity')}>{restaurantInfo.capacity}</span>
                        </div>
                    </div>
                </div>

                {editFormVisible && (
                    <div className="modal">
                        <div className="modal-overlay" onClick={() => setEditFormVisible(false)}></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="dashboard-card-title">Modifier</p>
                                <button className="modal-close" onClick={() => setEditFormVisible(false)}>&times;</button>
                            </div>
                            <div className="dashboard-form-group edit-info-form">
                                <input
                                    type="text"
                                    value={currentEditValue}
                                    onChange={(e) => setCurrentEditValue(e.target.value)}
                                />
                                <button onClick={saveEdit} className="submit-button">Enregistrer</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default RestaurantInfo;