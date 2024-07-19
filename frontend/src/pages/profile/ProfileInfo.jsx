import React from "react";
function ProfileInfo({ user }) {

    return (
        <>
            <div className="user-info">
                <h2 className="title-section">Informations Personnelles</h2>
                <div className="user-info-item">
                    <strong>Nom:</strong> {user.first_name} {user.last_name}
                </div>
                <div className="user-info-item">
                    <strong>Email:</strong> <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="c7b4a8b7afaea2e9aaa6b5b3aea987a2aaa6aeabe9a4a8aa">{user.email}</a>
                </div>



            </div>
        </>
    );
}

export default ProfileInfo;
