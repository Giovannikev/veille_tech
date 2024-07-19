import React from 'react';
import Header from './LoginHeader';
import { ResetForm } from './ResetForm';
import './css/LoginPage.css';
import './css/LoginForm.css';

function ResetPasswordPage() {
    return (
        <div className='login-body'>
            <div className="login-container">
                <Header />
                <div className="login-section">
                    <ResetForm />
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;