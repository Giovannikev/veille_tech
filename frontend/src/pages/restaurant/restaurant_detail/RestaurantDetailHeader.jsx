import React from "react";
import { useInView } from 'react-intersection-observer';
import { Link, useParams } from 'react-router-dom';
import CarrouselImage from "./CarrouselImage";
function RestaurantDetailHeader({ restaurant }) {

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (
        <>
            <div className="cover-content">
                <img src={restaurant.main_image} alt={restaurant.name} className="resto-cover-photo" />
                <div className="resto-profile-section">
                    <img src={restaurant.main_image} alt={restaurant.name} className="resto-profile-photo" />
                    <div className="restaurant-info">
                        <h1>{restaurant.name}</h1>
                        <Link to={`/reservation/${restaurant.id}`} className="sm-button  button-bg">Reserver votre table</Link>

                    </div>
                </div>
            </div>
            <div ref={inViewRef} className={`fade-in-section ${inView ? 'is-visible' : ''}`}>
                <h2 className='title'>Qui sommes nous? </h2>
                <p className="description">{restaurant.description}</p>
            </div>
            <div ref={inViewRef} className={`fade-in-section ${inView ? 'is-visible' : ''}`}>
                <h2 className='title'>Nos services</h2>
                <p className="description">{restaurant.services}</p>
            </div>

            <CarrouselImage />
        </>
    );
}
export default RestaurantDetailHeader; 