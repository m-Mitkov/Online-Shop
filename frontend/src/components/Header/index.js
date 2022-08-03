import { Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Context } from '../../Store';
import style from './Header.module.css'
import { logout } from '../../actions/authActions';

const Header = () => {
    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [, notifyDispatch] = notification;

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(authDispatch, notifyDispatch, navigate);
    };

    const headerWithAuth = () => {
        return (
            <>
                <Link className={style.linkLeft} to="/"> Home </Link>

                <Link
                    className={style.linkRight}
                    to="/logout"
                    onClick={handleLogout}
                    > 
                    Logout
                </Link>
            </>
        );
    };

    const defaultHeader = () => {
        return (
            <>
                <Link className={style.linkRight} to="/login"> Login </Link>
                <Link className={style.linkRight} to="/register" > Register</Link>
            </>
        );
    }

    return (
        <Fragment>
            <div className={style.navbar}>
            {
                user.toJS()._id === ''
                    ? defaultHeader()
                    : headerWithAuth()
            }
            </div>
        </Fragment>
    );
};

export default Header;