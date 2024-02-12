import { useCookies } from 'react-cookie';

const ListHeader = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);

    const signOut = () => {
        console.log('signout');
        removeCookie('Email');
        // removeCookie('Auth');
        removeCookie('AuthToken');
        window.location.reload();
    };

    return (
        <div className="list-header">
            <h1>Users Table</h1>
            <div className="button-container">
                <button className="signout" onClick={signOut}>
                    SIGN OUT
                </button>
            </div>
        </div>
    );
};

export default ListHeader;
