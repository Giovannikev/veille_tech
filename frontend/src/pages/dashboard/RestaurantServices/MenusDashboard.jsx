import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
function MenusDashboard({ restaurantId }) {

    const [menus, setMenus] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [newMenu, setNewMenu] = useState({
        name: '',
        dish_ids: [],
        available_days: [],
        category: 'APPETIZERS',
        restaurant: restaurantId,
    });
    const [menuModalVisible, setMenuModalVisible] = useState(false);
    const DAYS_OF_WEEK = [
        { value: 'MO', label: 'Monday' },
        { value: 'TU', label: 'Tuesday' },
        { value: 'WE', label: 'Wednesday' },
        { value: 'TH', label: 'Thursday' },
        { value: 'FR', label: 'Friday' },
        { value: 'SA', label: 'Saturday' },
        { value: 'SU', label: 'Sunday' },
    ];
    useEffect(() => {
        fetchMenus();
        fetchDishes();
    }, []);

    // Fetch all menus from the server
    const fetchMenus = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/menu/add/api/menu/?restaurant=${restaurantId}`);
            setMenus(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };

    // Fetch all dishes from the server
    const fetchDishes = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/menu/add/api/dish/?restaurant=${restaurantId}`);
            setDishes(response.data);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };
    const dishesOptions = dishes.map(dish => ({
        value: dish.id,
        label: dish.name
    }));

    // Handle input change for the new menu form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenu(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDishChange = (selectedOptions) => {
        const dishIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedDishes(dishIds);
        setNewMenu(prevState => ({ ...prevState, dish_ids: dishIds }));
    };

    // Handle multiple selection for available days
    const handleDaysChange = (selectedOptions) => {
        const days = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedDays(days);
        setNewMenu(prevState => ({ ...prevState, available_days: days }));
    };


    // Add a new menu
    const handleFormSubmit = async (e) => {
        const formData = new FormData();
        for (const key in newMenu) {
            formData.append(key, newMenu[key]);
        }
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/menu/add/api/menu/`,
                newMenu,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            setNewMenu({
                name: '',
                dish_ids: [],
                available_days: [],
                category: 'APPETIZERS',
                restaurant: restaurantId,
            });
            setSelectedDays([]);
            setSelectedDishes([]);
            fetchMenus();
            fetchDishes();
            setMenuModalVisible(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du menu:', error);
        }
    };

    // Delete a menu by ID
    const deleteMenu = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/menu/add/api/menu/${id}/`);
            setMenus(menus.filter(menu => menu.id !== id));
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };
    return (
        <>
            <div className="statistics-card">
                <h2 className="dashboard-card-title">Gestion des Menus</h2>
                <button onClick={async () => { await fetchDishes().then(setMenuModalVisible(true)) }} className="dashboard-add-button">Ajouter un Menu</button>
                <ul className="dashboard-list">
                    {menus.map(menu => (
                        <li key={menu.id} className="dashboard-list-item">
                            <p><strong>{menu.name}</strong><br />Jours disponibles: {menu.available_days.join(', ')}</p>
                            <button onClick={() => deleteMenu(menu.id)} className="dashboard-dish-delete-button">
                                <i className="fas fa-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Menu Modal */}
            {
                menuModalVisible && (
                    <div className="modal">
                        <div className="modal-overlay" onClick={() => setMenuModalVisible(false)}></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className='dashboard-card-title'>Ajouter un Menu</p>
                                <button className="modal-close" onClick={() => setMenuModalVisible(false)}>&times;</button>
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="name">Nom menu</label>
                                <input type="text" id="name" name="name" placeholder="Nom du Menu" value={newMenu.name} onChange={handleInputChange} />
                            </div>

                            <div className="dashboard-form-group">
                                <label htmlFor="dishes">Plats</label>
                                <Select
                                    name="dishes"
                                    options={dishesOptions}
                                    isMulti
                                    onChange={handleDishChange}
                                    value={dishesOptions.filter(option => selectedDishes.includes(option.value))}
                                    required
                                />
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="available_days">Jour du menu</label>
                                <Select
                                    options={DAYS_OF_WEEK}
                                    isMulti
                                    onChange={handleDaysChange}
                                    value={DAYS_OF_WEEK.filter(option => selectedDays.includes(option.value))}
                                />
                            </div>
                            <div className="dashboard-form-group">
                                <label htmlFor="category">Catégorie</label>
                                <select name="category" value={newMenu.category} onChange={handleInputChange} required>
                                    <option value="APPETIZERS">Entrées</option>
                                    <option value="MAIN_COURSES">Plats de résistance</option>
                                    <option value="SIDE_DISHES">Accompagnements</option>
                                    <option value="DESSERTS">Desserts</option>
                                    <option value="BEVERAGES">Boissons</option>
                                    <option value="SALADS">Salades</option>
                                    <option value="SOUPS">Soupes</option>
                                    <option value="SPECIALS">Plats du jour</option>
                                </select>
                            </div>
                            <button onClick={handleFormSubmit} className="submit-button">Ajouter</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default MenusDashboard;
