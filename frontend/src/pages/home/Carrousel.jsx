import React, { useState, useEffect, useRef } from 'react';
import RestaurantCard from '../restaurant/RestaurantCard';
import Spinner from '../../components/widgets/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTopRestaurants } from '../../features/restaurants/restaurantSlice';
import { Link } from 'react-router-dom';

const Carousel = ({ id, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const dispatch = useDispatch();
    const { restaurants, isLoading, isError, message } = useSelector(
        (state) => state.restaurants
    );

    useEffect(() => {
        dispatch(getTopRestaurants());
    }, [dispatch]);

    const scrollCarousel = (direction) => {
        const slideWidth = carouselRef.current.offsetWidth;
        const slidesPerView = 3;
        let newIndex = currentIndex + direction * slidesPerView;

        if (newIndex < 0) {
            newIndex = Math.max(0, restaurants.length - slidesPerView);
        } else if (newIndex >= restaurants.length) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);
        carouselRef.current.scrollTo({
            left: newIndex * (slideWidth / slidesPerView),
            behavior: 'smooth',
        });
    };
    var restaurantsCarrousel = restaurants.slice(id, id + 5);

    useEffect(() => {
        const handleResize = () => {
            carouselRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
            setCurrentIndex(0);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isLoading || !restaurants) {
        return <Spinner />;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }


    return (
        <div className="carousel-container section">
            <div className='carrousel-headers'>
                <h2 className='list-header carrousel-header'>{title}</h2>
                <Link to={`/restaurant/all`} className="view-more-btn">Voir plus</Link>
            </div>
            <div className="carousel" ref={carouselRef}>
                {restaurantsCarrousel.map((restaurant, index) => (
                    <div key={index} className="carousel-slide">
                        <RestaurantCard restaurant={restaurant} />
                    </div>
                ))}
            </div>
            <button className="carousel-button carousel-button-left" onClick={() => scrollCarousel(-1)}>&lt;</button>
            <button className="carousel-button carousel-button-right" onClick={() => scrollCarousel(1)}>&gt;</button>
        </div>
    );
};

export default Carousel;
