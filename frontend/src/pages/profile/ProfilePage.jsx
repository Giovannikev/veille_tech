import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';

import ProfileReservationList from "../profile/ProfileReservationList";
import ProfileInfo from "../profile/ProfileInfo";
import ProfileHeader from "../profile/ProfileHeader";
import "./css/ProfileHeader.css"
import "./css/ProfileInfo.css"
import "./css/ProfileReservationList.css"
import "./css/ProfileReservationCard.css"
function ProfilePage() {
    const { user } = useSelector(state => state.auth);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetchUserInfo();
    }, []);
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/accounts/current_user/`, {
                headers: {
                    "Authorization": `Bearer ${user.access}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    return (
        <>
            <ProfileHeader user={userData} />
            <div className="main-content-profile">
                <ProfileInfo user={userData} />
                <ProfileReservationList />
            </div>
        </>
    );
}
export default ProfilePage;