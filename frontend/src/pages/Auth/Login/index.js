import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate  } from 'react-router-dom';

import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container,
} from '@mui/material';

import style from './Login.module.css';
import { login } from '../../../services/apiServices/auth';
import { Context } from '../../../Store';
import { LOGIN_SUCCESS, SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../../../actions/actionTypes';

const Login = () => {

    const navigate = useNavigate ();

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [, notifyDispatch] = notification;

    console.log(user, 'user');

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // if (user.toJS()._id) {
    //     return <Navigate to="/" />
    // }

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    };

    const handleSbmit = async (e) => {
        e.preventDefault();

        login(formData)
            .then(res => {
                const response = JSON.parse(res);
                if (response.type === 'error') throw new Error(response);

                authDispatch({type: LOGIN_SUCCESS, payload: response});
                notifyDispatch({type: SUCCESS_NOTIFICATION, payload: { message: response.message }});
            })
            .then(() => navigate('/'))
            .catch(err => {
                notifyDispatch({type: ERROR_NOTIFICATION, payload: { message: err.message }});
            });
    }

    return (
        <>
            <h1>Sign in</h1>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={style.paper}>
                    <Avatar className={style.avatar}>
                    </Avatar>

                    <form className={style.form} noValidate onSubmit={handleSbmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={style.submit}
                        >
                            Sign In
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </>
    );
};

Login.propTypes = {
};

export default Login;