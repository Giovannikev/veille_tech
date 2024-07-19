import React from 'react';
import Header from './LoginHeader';
import ResetPasswordPageConfirmForm from './ResetPasswordPageConfirmForm';
import './css/LoginPage.css';
import './css/LoginForm.css';

function ResetPasswordPageConfirm() {
    return (
        <div className='login-body'>
            <div className="login-container">
                <Header />
                <div className="login-section">
                    <ResetPasswordPageConfirmForm />
                </div>
            </div>
        </div>
    );
}
export default ResetPasswordPageConfirm;