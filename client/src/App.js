import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import TableComponent from './components/Table/TableComponent';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ListHeader from './components/ListHeader';
import './index.css';

function App() {
    const navigate = useNavigate();
    const [cookies] = useCookies(null);
    const authToken = cookies.AuthToken;
    const userEmail = cookies.Email;

    useEffect(() => {
        if (!authToken) {
            navigate('/');
        }
    }, [authToken, navigate]);

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        authToken ? (
                            <>
                                <div className="app">
                                    <ListHeader />
                                    <p className="user-email">
                                        Welcome back {userEmail}
                                    </p>
                                    <TableComponent />
                                </div>
                            </>
                        ) : (
                            <Auth />
                        )
                    }
                />
            </Routes>
        </>
    );
}

export default App;
