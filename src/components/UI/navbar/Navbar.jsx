import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../button/MyButton';

import { AuthContext } from '../../../context';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <div className='navbar__wrapper'>
                <div className="navbar__links">
                    <Link to='/'>Home</Link>
                    <Link to='/posts'>Posts</Link>
                </div>
                {isAuth && 
                    <MyButton onClick={logout}>Log out</MyButton>
                }
            </div>
        </div>
    );
}

export default Navbar;
