import React from 'react';
import { FaLock, FaUnlock, FaTrash } from 'react-icons/fa';

const TableActions = ({ blockSelectedRows, unblockSelectedRows, deleteSelectedRows }) => {
    return (
        <div>
            <button className="button" onClick={blockSelectedRows}>
                <FaLock />
                Block
            </button>
            <button className="button" onClick={unblockSelectedRows}>
                <FaUnlock />
            </button>
            <button className="button delete-button" onClick={deleteSelectedRows}>
                <FaTrash />
            </button>
        </div>
    );
};

export default TableActions;
