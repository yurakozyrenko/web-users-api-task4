import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableActions from './TableActions';
import { useNavigate } from 'react-router-dom';
import '../../index.css';

const TableComponent = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [users, setUsers] = useState(null);
    const [status, setStatus] = useState(null);
    const authToken = cookies.AuthToken;
    const userEmail = cookies.Email;

    const getData = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURL}/users`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const json = await response.json();

            if (json.message === 'Не авторизован') {
                removeCookie('AuthToken');
                navigate('/');
            }
            setUsers(json);
        } catch (err) {
            console.error(err);
        }
    };

    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (authToken) {
                await getData();
                setLoading(false);
            }
        };

        fetchData();
    }, [authToken]);

    const headers = users ? ['Select', ...Object.keys(users[0])] : [];

    const toggleAllRows = () => {
        if (selectedRows.length === users.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(users.map((el) => el.email));
        }
    };

    const toggleRow = (rowIndex) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowIndex)) {
                return prevSelectedRows.filter((index) => index !== rowIndex);
            } else {
                return [...prevSelectedRows, rowIndex];
            }
        });
    };

    const performAction = async (url, method, actionName) => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedRows }),
            });

            if (response.ok) {
                await getData();
                console.log(`${actionName} successful`);
            } else {
                console.error(`Error ${actionName}:`, response.status);
            }
        } catch (err) {
            console.error(`Error ${actionName}:`, err);
        }
    };

    const blockSelectedRows = async () => {
        const userStatus = await checkUserStatus();
        if (userStatus === 'ACTIVE') {
            performAction(
                `${process.env.REACT_APP_SERVERURL}/users/block`,
                'PATCH',
                'Block'
            );
        } else {
            console.log('User is not active. Cannot perform Block operation.');
        }
    };

    const unblockSelectedRows = async () => {
        const userStatus = await checkUserStatus();
        if (userStatus === 'ACTIVE') {
            performAction(
                `${process.env.REACT_APP_SERVERURL}/users/unblock`,
                'PATCH',
                'Unblock'
            );
        } else {
            console.log(
                'User is not active. Cannot perform Unblock operation.'
            );
        }
    };

    const deleteSelectedRows = async () => {
        const userStatus = await checkUserStatus();
        if (userStatus === 'ACTIVE') {
            performAction(
                `${process.env.REACT_APP_SERVERURL}/users/`,
                'DELETE',
                'Delete'
            );
        } else {
            console.log('User is not active. Cannot perform Delete operation.');
        }
    };

    const checkUserStatus = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURL}/users/${userEmail}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (!response.ok) {
                removeCookie('AuthToken');
                navigate('/');
                return null;
            }

            const json = await response.json();
            const userStatus = json.status;

            if (userStatus !== 'ACTIVE') {
                removeCookie('AuthToken');
                navigate('/');
            }

            setStatus(userStatus);
            return userStatus;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <TableActions
                        blockSelectedRows={blockSelectedRows}
                        unblockSelectedRows={unblockSelectedRows}
                        deleteSelectedRows={deleteSelectedRows}
                    />
                    <table>
                        <TableHeader
                            headers={headers}
                            selectedRows={selectedRows}
                            toggleAllRows={toggleAllRows}
                        />
                        <TableBody
                            users={users}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                        />
                    </table>
                </>
            )}
        </div>
    );
};

export default TableComponent;
