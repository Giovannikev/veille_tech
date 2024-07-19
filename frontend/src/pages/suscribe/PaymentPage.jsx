import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './css/PaymentPage.css';

const PayementPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan } = location.state;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation basique du formulaire
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const cardNumber = e.target.elements.cardNumber.value;
        const cardExpiry = e.target.elements.cardExpiry.value;
        const cardCvc = e.target.elements.cardCvc.value;
        const country = e.target.elements.country.value;

        if (name && email && cardNumber && cardExpiry && cardCvc && country) {
            navigate('/');
            toast.success('Paiement traité avec succès ! Bienvenue dans la famille Ikaly !');
            toast.success('Vous avez maintenant votre compte restaurant créé');
        } else {
            alert('Veuillez remplir tous les champs du formulaire.');
        }
    };

    return (
        <div className='container-form'>
            <div className="payement-container">
                <header>
                    <h1 className='title-form-payment'>Finaliser votre abonnement {plan.title}</h1>
                </header>

                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="reservation-form-group">
                        <label htmlFor="name">Nom complet</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="reservation-form-group">
                        <label htmlFor="email">Adresse e-mail</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="reservation-form-group card-details">
                        <div className="card-number">
                            <label htmlFor="cardNumber">Numéro de carte</label>
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="card-expiry">
                            <label htmlFor="cardExpiry">Date d'expiration</label>
                            <input type="text" id="cardExpiry" name="cardExpiry" placeholder="MM/AA" required />
                        </div>
                        <div className="card-cvc">
                            <label htmlFor="cardCvc">CVC</label>
                            <input type="text" id="cardCvc" name="cardCvc" placeholder="123" required />
                        </div>
                    </div>

                    <div className="reservation-form-group">
                        <label htmlFor="country">Pays</label>
                        <select id="country" name="country" required>
                            <option value="">Sélectionnez votre pays</option>
                            <option value="FR">France</option>
                            <option value="MG">Madagascar</option>
                            <option value="CH">Suisse</option>
                            <option value="CA">Canada</option>
                            <option value="Other">Autre</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Payer maintenant</button>
                </form>

                <div className="order-summary">
                    <h2 className='order-summary-title'>Récapitulatif de la commande</h2>
                    <div className="order-details">
                        <span>{plan.title}</span>
                        <span>{plan.price}/mois</span>
                    </div>

                    <div className="order-details total">
                        <span>Total</span>
                        <span>{plan.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayementPage;
