import React from 'react'
import { Outlet } from 'react-router-dom';
import LoginView from '../views/login/LoginView';

const useAuth = () => {
    const user = {name: "", isAuthenticated: false}
    return user && user.name && user.isAuthenticated;
}

export default function ProtectedRoutes() {
    const isAuth = useAuth();

    return isAuth ? <Outlet/> : <LoginView/>;
}
