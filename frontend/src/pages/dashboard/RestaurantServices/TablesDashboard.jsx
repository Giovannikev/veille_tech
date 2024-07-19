import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TablesDashboard({ restaurantId }) {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({
        number: '',
        type_table: 'Simple',
        statut: 'Non occupé',
        description: '',
        nb_chaises: '',
        nb_place: "",
        restaurant: restaurantId,
        image: null,
    });
    const [tableModalVisible, setTableModalVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/table/add/api/tables/?restaurant=${restaurantId}`);
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewTable(prevState => ({ ...prevState, image: file }));
    };


    const addTable = async () => {
        const formData = new FormData();
        for (const key in newTable) {
            formData.append(key, newTable[key]);
        }

        try {
            await axios.post('http://127.0.0.1:8000/table/add/api/tables/', formData);
            setNewTable({
                number: '',
                type_table: 'Simple',
                statut: 'Non occupé',
                description: '',
                nb_chaises: '',
                nb_place: "",
                restaurant: '',
                image: 'null.jpg',
            });
            setTableModalVisible(false);
            fetchTables();
        } catch (error) {
            console.error('Error adding table:', error);
            console.error('Error details:', error.response.data);
            setError(error.response.data);
        }
    };

    const deleteTable = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/table/add/api/tables/${id}/`);
            setTables(tables.filter(table => table.id !== id));
        } catch (error) {
            console.error('Error deleting table:', error);
            setError(error.response.data);
        }
    };
    return (
        <>
            <div className="statistics-card">
                <h2 className="dashboard-card-title">Gestion des Tables</h2>
                <button onClick={() => setTableModalVisible(true)} className="dashboard-add-button">Ajouter une Table</button>
                <ul className="dashboard-list">
                    {tables.map(table => (
                        <li key={table.id} className="dashboard-list-item">
                            <div className="flex-between">

                                <img src={table.image} alt={table.name} className="dashboard-table-image" />
                                <div className="plat-details">
                                    <p><strong>Table {table.number}</strong> ({table.nb_place} pers)</p>
                                    <p className='table-description'>{table.description}</p>
                                    <button className="status-button" onClick={() => deleteTable(table.id)}>Supprimer</button>

                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Table Modal */}
            {tableModalVisible && (
                <div className="modal">
                    <div className="modal-overlay" onClick={() => setTableModalVisible(false)}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className='dashboard-card-title'>Ajouter une Table</p>
                            <button className="modal-close" onClick={() => setTableModalVisible(false)}>&times;</button>
                        </div>
                        <div className='grid-forms'>
                            <div className=''>
                                <div className="dashboard-form-group">
                                    <label htmlFor="number">Numéro de Table</label>
                                    <input type="number" name="number" placeholder="Numéro de Table" value={newTable.number} onChange={handleInputChange(setNewTable)} required />
                                </div>
                                <div className="dashboard-form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" name="image" onChange={handleFileChange} />
                                </div>
                                <div className="dashboard-form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" placeholder="Description" value={newTable.description} onChange={handleInputChange(setNewTable)} />
                                </div>
                            </div>
                            <div className=''>
                                <div className="dashboard-form-group">
                                    <label htmlFor="nb_place">Capacité</label>
                                    <input type="number" name="nb_place" placeholder="Nombre de place" value={newTable.nb_place} onChange={handleInputChange(setNewTable)} required />
                                </div>
                                <div className="dashboard-form-group">
                                    <label htmlFor="nb_chaises">Nombre de chaises</label>
                                    <input type="number" name="nb_chaises" placeholder="Nombre de Chaises" value={newTable.nb_chaises} onChange={handleInputChange(setNewTable)} required />
                                </div>

                                <div className="dashboard-form-group">
                                    <label htmlFor="type_table">Type de Table</label>
                                    <select name="type_table" value={newTable.type_table} onChange={handleInputChange(setNewTable)} required>
                                        <option value="VIP">VIP</option>
                                        <option value="Simple">Simple</option>
                                        <option value="Familiale">Familiale</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <button onClick={addTable} className="submit-button">Ajouter</button>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>Erreur: {error}</p>
                </div>
            )}
        </>
    );
}

export default TablesDashboard;
