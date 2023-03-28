import React, { useContext } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

import Loader from './UI/loader/Loader';

import { AuthContext } from '../context';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader/>
    }

    return (
        <div style={{width: '90%'}}>
            {isAuth
                ? <PrivateRoutes/>
                : <PublicRoutes/>
            }
        </div>
    );
}

export default AppRouter;
