import React, { useState, useEffect } from 'react';
import './css/CarrouselImage.css';
function CarrouselImage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        {
            backgroundImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCUyM3Jlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            title: 'Au bort de la mer',
            description: 'Un formidable couché de soleil'
        },
        {
            backgroundImage: 'https://media.istockphoto.com/id/104704117/fr/photo/plats-du-restaurant.jpg?s=612x612&w=0&k=20&c=LjWTB5Ed9TlXG239T3apgo0GifWhLA1oQjxH84P1T2Q=',
            title: 'Repas diversifié',
            description: 'Fruit de mer en tout genre'
        },
        {
            backgroundImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?cs=srgb&dl=pexels-pixabay-262978.jpg&fm=jpg',
            title: 'Chef étoilé',
            description: 'Un vrai cordon bleu'
        },
        {
            backgroundImage: 'https://www.aixenprovencetourism.com/wp-content/uploads/2013/07/ou_manger-1920x1080.jpg',
            title: 'Chef étoilé',
            description: 'Un vrai cordon bleu'
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % items.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        resetInterval();
    };

    let interval;

    const resetInterval = () => {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    };

    useEffect(() => {
        interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    return (
        <>                <h2 className='title'>Notre restaurant en image</h2>
            <div className="image-carousel">

                <div className="image-carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="image-carousel-item"
                            style={{ backgroundImage: `url(${item.backgroundImage})` }}
                        >
                            <div className="image-carousel-caption">
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="image-carousel-indicators">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`image-carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </>

    );
}
export default CarrouselImage;