import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate  } from 'react-router-dom';

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
import { login } from '../../../actions/authActions';
import { Context } from '../../../Store';

const Login = () => {
    const navigate = useNavigate ();

    const { auth, notification } = useContext(Context);
    const [user, authDispatch] = auth;
    const [, notifyDispatch] = notification;

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    };

    const handleSbmit = async (e) => {
        e.preventDefault();
        await login(authDispatch, notifyDispatch, navigate, formData);
    };

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
                            <Grid item style={{
                                marginTop: '0.9vh'
                            }}>
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