import React from "react";

function ProfileHeader({ user }) {
    const user_image = `http://127.0.0.1:8000${user.image}`

    const username = user.first_name + ' ' + user.last_name;
    return (
        <>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Couverture du profil" className="profile-cover-photo" />
            <div className="profile-section">
                <img src={user_image} alt="Photo de profil" className="profile-photo" />
                <div className="user-name">
                    <h1 className="profile-name">{username}</h1>
                </div>
            </div>
        </>
    );
}

export default ProfileHeader;
