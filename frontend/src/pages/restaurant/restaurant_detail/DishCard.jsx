import React from "react";
function DishCard({ image, name, description }) {
    return (
        <div className="card-dish">
            <img src={image} alt={name} className="card-dish-image" />
            <div className="card-dish-overlay">
                <h2 className="card-dish-title">{name}</h2>
                <p className="card-dish-description">{description}</p>
            </div>
        </div>
    );
}
export default DishCard;