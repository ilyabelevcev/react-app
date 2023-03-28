import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import {publicRoutes} from '../router'

const PublicRoutes = () => {
    return (
        <Routes>
            {publicRoutes.map((route, index) =>
                <Route 
                    key={index}
                    path={route.path} 
                    element={route.element}
                    exact={route.exact}
                />
            )}
            <Route 
                path='*' 
                element={
                    <Navigate to='/login'/>
                }
            />
        </Routes>
    );
}

export default PublicRoutes;
