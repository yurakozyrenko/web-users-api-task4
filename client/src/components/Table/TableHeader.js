import React from 'react';

const TableHeader = ({ headers, selectedRows, toggleAllRows }) => {
    return (
        <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        checked={selectedRows.length === headers.length - 1}
                        onChange={toggleAllRows}
                    />
                </th>
                {headers.slice(1).map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
