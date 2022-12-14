import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'

import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Container
} from '@mui/material';

import Permissions from '../../../components/Permissions';
import style from './Register.module.css';
import { register } from '../../../actions/authActions';
import { Context } from '../../../Store';

const Register = () => {
    const navigate = useNavigate();

    const { notification } = useContext(Context);
    const [, notifyDispatch] = notification;

    const [permissions, setPermissions] = useState([]);
    const handlePermissionChange = e => {
        const {
            target: { value },
        } = e;
        setPermissions(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePassword: ''
    });

    const handleChange = e => {

        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    };

    const submitData = async e => {
        e.preventDefault();

        await register(notifyDispatch, navigate, { ...formData, permissions });
    };

    return (
        <>
            <h1>Sign up</h1>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={style.paper}>
                    <Avatar className={style.avatar}>
                    </Avatar>

                    <form className={style.form} noValidate onSubmit={submitData}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} s>
                                <TextField
                                    autoComplete="martin"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="rePassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="rePassword"
                                    onChange={handleChange}
                                    autoComplete="rePassword"
                                />
                            </Grid>
                            <Grid item xs={12} id="radio-buttons" required>
                                <Permissions 
                                    handleChange={handlePermissionChange}
                                    data={permissions}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={style.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item style={{
                                marginTop: '0.9vh'
                            }}>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>
        </>
    );
};

Register.propTypes = {
};

export default Register;