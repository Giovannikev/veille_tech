import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './css/Banner.css';

const Banner = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)


    return (
        <div className="banner">
            <div className="content">
                <h1 className="banner__title">IKaly</h1>
                <div className="decorative-line"></div>
                <p>Découvrez les meilleurs restaurants près de chez vous et réservez une table en quelques clics !</p>

                {user ?
                    <>
                        <Link to={`/restaurant/all`} className="cta-button sm-button">Commencez Votre Voyage Culinaire</Link>
                    </> :
                    <>
                        <Link to={`/login`} className="cta-button sm-button">Se connecter</Link>
                        <Link to={`/signup`} className="cta-button-outlined sm-button">S'inscrire</Link>
                    </>}

            </div>
            <div className="scroll-indicator"></div>

        </div>
    );
}

export default Banner;
