import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import DishCard from "./DishCard"

function MenuList({ category, cards, name }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselInnerRef = useRef(null);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const getVisibleCards = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    const updateCarousel = () => {
        if (carouselInnerRef.current) {
            const cardWidth = carouselInnerRef.current.offsetWidth / getVisibleCards();
            carouselInnerRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    };

    const goToNextSlide = () => {
        const visibleCards = getVisibleCards();
        if (currentIndex < cards.length - visibleCards) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        updateCarousel();
        window.addEventListener('resize', () => {
            setCurrentIndex(0);
            updateCarousel();
        });

        return () => {
            window.removeEventListener('resize', updateCarousel);
        };
    }, [currentIndex, cards.length]);
    return (
        <>
            <div ref={inViewRef} className={`menus fade-in-section ${inView ? 'is-visible' : ''}`}>

                <h3>{name}</h3>
                <div className="carousel-menu ">
                    <div className="carousel-menu-inner" ref={carouselInnerRef}>
                        {cards.map((card, index) => (
                            <DishCard key={index} {...card} />
                        ))}
                    </div>
                    <button onClick={goToPrevSlide} className="carousel-menu-button carousel-menu-button-prev">&lt;</button>
                    <button onClick={goToNextSlide} className="carousel-menu-button carousel-menu-button-next">&gt;</button>
                </div>
            </div>
        </>
    );
}
export default MenuList; 