import React, { useState } from "react";

function TableSelection({ handleTableSelect, availableTables }) {
    const [selectedTable, setSelectedTable] = useState(null);
    if (!availableTables || availableTables.length === 0) {
        return null;
    }

    const handleTableClick = (table) => {
        setSelectedTable(table);
        handleTableSelect(table);
    };
    return (
        <div className="container">
            <div className="tableSelectionForm" >
                <label className="reservation-label">Tables disponibles</label>
                <div className="table-selection">
                    {availableTables.map((table) => (
                        <div
                            key={table.id}
                            className={`table-option ${selectedTable && selectedTable.id === table.id ? 'selected' : ''}`}
                            onClick={() => handleTableClick(table)}
                        >
                            <div className="table-icon"><img src={table.image} alt={table.number} /></div>
                            <div className="table-name">{table.type_table}</div>
                            <div className="table-description">{table.description}</div>
                            <div className="table-seats">Places : {table.nb_place}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TableSelection;
