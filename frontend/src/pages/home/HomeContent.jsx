import React, { useEffect } from 'react';
import Carousel from './Carrousel';
import IntermediateBanner from './IntermediateBanner';
import './css/Sections.css';
import './css/IntermediateBanner.css';
import './css/Carrousel.css';

function HomeContent() {

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                if (isElementInViewport(section)) {
                    section.classList.add('visible');
                }
            });
        };

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('load', handleScroll);

        };
    }, []);
    const intermediateBannerContent = [
        {
            title: 'Découvrez les Meilleurs Restaurants',
            subtitle: "Profitez d'une expérience culinaire exceptionnelle avec une sélection des meilleurs restaurants de votre région. Réservez facilement et savourez des moments gourmands inoubliables.",
            url: "/trouver-un-restaurant",
            image: ""
        },
        {
            title: 'Réservation Facile et Rapide',
            subtitle: "Simplifiez vos réservations avec notre plateforme intuitive. En quelques clics, trouvez et réservez une table dans votre restaurant préféré.",
            url: "/reserver-maintenant",
            image: ""
        },
        {
            title: 'Offres Spéciales et Promotions',
            subtitle: "Ne manquez pas nos offres spéciales et promotions exclusives. Profitez de réductions et de menus spéciaux dans les meilleurs restaurants de votre région.",
            url: "/voir-les-offres",
            image: ""
        },
        {
            title: 'Soirées et Événements',
            subtitle: "Découvrez les événements gastronomiques et soirées spéciales organisés par nos restaurants partenaires. Réservez votre place pour une soirée inoubliable.",
            url: "/lire-les-avis",
            image: ""
        }
    ];


    return (
        <div id="sections" className="sections">
            <IntermediateBanner content={intermediateBannerContent[0]} />
            <Carousel id={0} title={"Les meilleurs restaurants du moment"} />
            <IntermediateBanner content={intermediateBannerContent[1]} />
            <Carousel id={6} title={"Les plus visités"} />
            <IntermediateBanner content={intermediateBannerContent[2]} />
            <Carousel id={12} title={"Les nouveaux restaurants"} />
        </div>
    );
}

export default HomeContent;
