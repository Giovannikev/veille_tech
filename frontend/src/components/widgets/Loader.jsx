import React from "react";
import './css/Loader.css'
function Loader() {
    return (
        <div className="loader">
            <h1 className="loader-tilte">Ikaly</h1>
            <div className="loader-spinner"></div>
            <p className="loader-message">Préparation de votre table virtuelle...</p>

        </div>
    );
}
export default Loader; 
