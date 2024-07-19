import React from 'react';
import Header from './LoginHeader';
import { LoginForm } from './LoginForm';
import LoginSocial from './LoginSocial';
import './css/LoginPage.css';
import './css/LoginForm.css';

function LoginPage() {
    return (
        <div className='login-body'>
            <div className="login-container">
                <Header />
                <div className="login-section">
                    <LoginForm />
                    <LoginSocial />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;