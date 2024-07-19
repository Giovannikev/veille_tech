import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DishesDashboard({ restaurantId }) {
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        restaurant: restaurantId,
    });


    const [dishModalVisible, setDishModalVisible] = useState(false);
    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/menu/add/api/dish/?restaurant=${restaurantId}`);
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDish(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewDish(prevState => ({ ...prevState, image: file }));
    };

    const addDish = async () => {
        const formData = new FormData();
        for (const key in newDish) {
            formData.append(key, newDish[key]);
        }

        try {
            await axios.post('http://127.0.0.1:8000/menu/add/api/dish/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewDish({
                name: '',
                description: '',
                price: '',
                image: null,
                restaurant: restaurantId,
            });
            setDishModalVisible(false);
            fetchDishes();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du plat', error);
        }
    };

    const deleteDish = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/menu/add/api/dish/${id}/`);
            setDishes(dishes.filter(dish => dish.id !== id));
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };
    /*
    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter(prevState => ({ ...prevState, [name]: value }));
    };

    const deletePlat = (id) => {
        setdishes(dishes.filter(plat => plat.id !== id));
    };
    const addPlat = () => {
        setdishes([...dishes, { id: dishes.length + 1, ...newPlat }]);
        setNewPlat({ name: '', description: '', price: '' });
        setPlatModalVisible(false);
    };
*/

    return (
        <>
            <div className="statistics-card">
                <h2 className="dashboard-card-title">Gestion des plats</h2>
                <button onClick={() => setDishModalVisible(true)} className="dashboard-add-button">Ajouter un Plat</button>
                <ul className="dashboard-list">
                    {dishes.map(dish => (
                        <li key={dish.id} className="dashboard-list-item">
                            <div className="flex-between">

                                <img src={dish.image} alt={dish.name} className="dashboard-plat-image" />
                                <div className="plat-details">
                                    <strong>{dish.name} - {dish.price}€</strong>
                                    <p>{dish.description}</p>
                                </div>
                                <button onClick={() => deleteDish(dish.id)} className="dashboard-dish-delete-button">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Plat Modal */}
            {
                dishModalVisible && (
                    <div className="modal">
                        <div className="modal-overlay" onClick={() => setDishModalVisible(false)}></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className='dashboard-card-title'>Ajouter un Plat</p>
                                <button className="modal-close" onClick={() => setDishModalVisible(false)}>&times;</button>
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="name">Nom</label>
                                <input type="text" name="name" placeholder="Nom du Plat" value={newDish.name} onChange={handleInputChange} />
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" name="description" placeholder="Description" value={newDish.description} onChange={handleInputChange} />
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="price">Prix</label>
                                <input type="number" name="price" placeholder="Prix" value={newDish.price} onChange={handleInputChange} />
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" onChange={handleFileChange} />
                            </div>
                            <button onClick={addDish} className="submit-button">Ajouter</button>
                        </div>
                    </div>
                )
            }</>
    );
}

export default DishesDashboard;