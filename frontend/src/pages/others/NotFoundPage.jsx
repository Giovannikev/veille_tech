import React, { useEffect, useRef } from 'react';
import { Link, } from 'react-router-dom';

import { LuSearchX } from "react-icons/lu";
import './css/NotFoundPage.css';

const NotFoundPage = () => {
    const containerRef = useRef(null);
    const utensilsRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const container = containerRef.current;
            if (container) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
                container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            }
        };

        const handleMouseEnter = () => {
            const utensils = utensilsRef.current;
            if (utensils) {
                utensils.style.animation = 'none';
                setTimeout(() => {
                    utensils.style.animation = 'wiggle 2s infinite';
                }, 50);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        const utensils = utensilsRef.current;
        if (utensils) {
            utensils.addEventListener('mouseenter', handleMouseEnter);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (utensils) {
                utensils.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, []);

    return (
        <div className='not-found-page'>
            <div className="not-found-page-container" ref={containerRef}>
                <div className="utensils" ref={utensilsRef}><LuSearchX color='#14213D' /></div>
                <h1>Oups ! Menu non trouvé</h1>
                <div className="error-code">404</div>
                <p>Il semble que le plat que vous recherchez ne soit pas à notre menu aujourd'hui.</p>
                <div className="not-found-page-menu-item">Peut-être essayez notre délicieuse erreur à la page d'accueil ?</div>
                <p>Nos chefs travaillent dur pour vous préparer de nouvelles pages savoureuses.</p>
                <Link to={`/`} className="sm-button button-bg">Retour à l'accueil</Link>

            </div>
        </div>
    );
};

export default NotFoundPage;
