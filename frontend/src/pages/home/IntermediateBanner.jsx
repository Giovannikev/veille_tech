import React from 'react';
import { Link } from 'react-router-dom';

const IntermediateBanner = ({ content }) => {
    return (
        <>
            <div className="intermediate__banner section">
                <div className="intermediate__banner-content">
                    <h2>{content.title}</h2>
                    <p>{content.subtitle}</p>
                    <Link to={`/restaurant/all`} className="cta-button sm-button">Trouver votre bonheur</Link>

                </div>
            </div>
        </>
    );
};

export default IntermediateBanner;
