import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../index.css'

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLogIn, setIsLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const viewLogin = (status) => {
        setError(null);
        setIsLogin(status);
    };

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogIn && password !== confirmPassword) {
            setError('Make sure passwords match');
            return;
        }
        const response = await fetch(
            `${process.env.REACT_APP_SERVERURL}/users/${endpoint}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            }
        );
        const data = await response.json();
        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h1>Web APP</h1>
                    <h2>{isLogIn ? 'Please log in' : 'Please registration'}</h2>
                    {!isLogIn && (
                        <input
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogIn && (
                        <input
                            type="password"
                            placeholder="confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <input
                        type="submit"
                        className="create"
                        onClick={(e) =>
                            handleSubmit(e, isLogIn ? 'login' : 'registration')
                        }
                    />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button
                        onClick={() => viewLogin(false)}
                        style={{
                            backgroundColor: !isLogIn
                                ? 'rgb(255,255,255'
                                : 'rgb(188,188,188',
                        }}
                    >
                        Registration
                    </button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{
                            backgroundColor: isLogIn
                                ? 'rgb(255,255,255'
                                : 'rgb(188,188,188',
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
