import React from 'react';
import TableRow from './TableRow';

const TableBody = ({ users, selectedRows, toggleRow }) => {
    return (
        <tbody>
            {users.map((item) => (
                <TableRow
                    key={item.email}
                    item={item}
                    selectedRows={selectedRows}
                    toggleRow={toggleRow}
                />
            ))}
        </tbody>
    );
};

export default TableBody;
