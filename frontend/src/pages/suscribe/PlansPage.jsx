
import React, { useEffect } from 'react';
import PlanCard from './PlanCard';
import './css/PlansPage.css';

const PlansPage = () => {
    const plans = [
        {
            title: 'Basique',
            price: '9,99 €',
            features: ['Réservations illimitées', 'Support client standard', 'Accès à toutes les fonctionnalités de base'],
            link: '/payment',
        },
        {
            title: 'Classique',
            price: '14,99 €',
            features: ['Réservations illimitées', 'Support client prioritaire', 'Accès à des fonctionnalités avancées', 'Accès à des offres spéciales'],
            link: '/payment',
            bestValue: true,
        },
        {
            title: 'Premium',
            price: '19,99 €',
            features: ['Réservations illimitées', 'Support client prioritaire', 'inclus dans les propositions chatbot', 'Accès à des fonctionnalités avancées', 'Accès à des offres spéciales', 'Gestion de plusieurs comptes'],
            link: '/payment',
        },
    ];


    return (
        <div className='subscribe-container '>
            <div className='plan-header'>
                <h1 className='plan-title'>Choisissez votre abonnement Ikaly</h1>
                <p className="plan-subtitle">Débloquez toutes les fonctionnalitées de Ikaly</p>
            </div>
            <div className='plan-container'>
                <div className="plans">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PlansPage;
