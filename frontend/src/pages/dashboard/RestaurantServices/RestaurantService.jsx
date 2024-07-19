import React from 'react';
import MenusDashboard from './MenusDashboard';
import DishesDashboard from './DishesDashboard';
import TablesDashboard from './TablesDashboard';
import './css/RestaurantService.css';

function RestaurantService({ restaurantId }) {
    return (

        <div className='statistics-container'>
            <div className="grid">
                <MenusDashboard restaurantId={restaurantId} />
                <DishesDashboard restaurantId={restaurantId} />
                <TablesDashboard restaurantId={restaurantId} />
            </div>
        </div>

    );
}

export default RestaurantService;