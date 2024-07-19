
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const PlanCard = ({ plan }) => {
    const navigate = useNavigate();
    const handlePayment = () => {
        navigate('/payment', { state: { plan } });
    };
    return (
        <div className={`plan ${plan.bestValue ? 'best-value' : ''}`}>
            <h2 >{plan.title}</h2>
            <div className="price">{plan.price}<span>/mois</span></div>
            <ul className="features">
                {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button onClick={handlePayment} className="subscribe-cta-button">Choisir ce plan</button>
        </div>
    );
};
export default PlanCard;
