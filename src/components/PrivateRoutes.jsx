import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes} from '../router'

const PrivateRoutes = () => {
    return (
        <Routes>
            {privateRoutes.map((route, index) =>
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
                    <Navigate to='/posts'/>
                }
            />
        </Routes>
    );
}

export default PrivateRoutes;
