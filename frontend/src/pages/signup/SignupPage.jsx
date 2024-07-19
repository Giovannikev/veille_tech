import React from 'react';

import SignupLeftPanel from './SignupLeftPanel';
import { SignupHeader } from './SignupHeader';
import { SignupForm } from './SignupForm';
import { SignupSocial } from './SignupSocial';
import './css/Signup.css';

function SignupPage() {
    return (
        <>
            <div className="signup-body">
                <div className="signup-container">
                    <SignupLeftPanel />
                    <div className="signup-section">
                        <SignupHeader />
                        <SignupForm />
                        <SignupSocial />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;