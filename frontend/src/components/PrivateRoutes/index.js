import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import { Context } from '../../Store';

const PrivateRoutes = () => {
    const { auth } = useContext(Context);
    const [user] = auth;
    const userToJS = user.toJS();

    return (
        userToJS.token
            ? <Outlet />
            : <Navigate to="/login" />
    );
};

export default PrivateRoutes;