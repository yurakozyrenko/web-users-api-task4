import React from 'react';

const TableRow = ({ item, selectedRows, toggleRow }) => {
    
    const headers = Object.keys(item);
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={selectedRows.includes(item.email)}
                    onChange={() => toggleRow(item.email)}
                />
            </td>
            {headers.map((header, colIndex) => (
                <td key={colIndex}>{item[header]}</td>
            ))}
        </tr>
    );
};

export default TableRow;
