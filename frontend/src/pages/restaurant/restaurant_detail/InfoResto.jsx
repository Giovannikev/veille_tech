import React from "react";
function InfoResto() {
    return (
        <>
            <div className="info-resto">
                <h2 className='title'> A propos </h2>
            </div>
            <div className="restaurant-info-container">
                <div className="info-column">
                    <h2>Informations Générales</h2>
                    <div className="info-resto-item">
                        <strong>Adresse:</strong> 123 Rue de la Gastronomie, 75001 Paris
                    </div>
                    <div className="info-resto-item">
                        <strong>Capacité:</strong> 80 personnes
                    </div>
                    <div className="info-resto-item">
                        <strong>Nombre de tables:</strong> 20
                    </div>
                    <div className="info-resto-item">
                        <strong>Horaires:</strong> Lun-Sam 12h-14h30, 19h-22h30
                    </div>
                    <div className="info-resto-item">
                        <strong>Cuisine:</strong> Française contemporaine
                    </div>
                    <div className="info-resto-item">
                        <strong>Chef:</strong> Marie Dubois
                    </div>
                    <div className="info-resto-item">
                        <strong>Prix moyen:</strong> 65€
                    </div>
                </div>
                <div className="info-column">
                    <h2>Contacts</h2>
                    <div className="contact-item">
                        <strong>contact</strong>
                        <div>+33 1 23 45 67 89</div>
                    </div>
                    <div className="contact-item">
                        <strong>email</strong>
                        <div><a className="__cf_email__" >mail@gmail.com</a></div>
                    </div>
                    <div className="contact-item">
                        <strong> siteweb</strong>
                        <div>www.lerestaurant.com</div>
                    </div>

                    <div className="contact-item">
                        <strong>facebook</strong>
                        <div>facebook.com/lerestaurant</div>
                    </div>
                    <div className="contact-item">
                        <strong> Instagram</strong>
                        <div>instagram.com/lerestaurant</div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default InfoResto;