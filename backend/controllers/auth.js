const { Router } = require('express');
const authService = require('../services/auth');
const { AUTH_COOKIE_JWT, USER_CREDENTIALS } = require('../config/config');

const router = Router();

router.post('/register', async (req, res) => {
  try {
        await authService.registerUser(req.body);
        const body = req.body;
        res.status(201).json({
            type: 'succes',
            message: 'User successfully created!'
        })
  } catch (error) {
        res.status(500).json(error || {
            type: 'error',
            message: 'Something went wrong, please try again later!'
        });
  }
    
});

router.post('/login', async (req, res) => {
   try {
        const { token, userCredentials } =  await authService.login(req.body);
        res.header(USER_CREDENTIALS, JSON.stringify(userCredentials)); // not sure need it
        res.header(AUTH_COOKIE_JWT, token);
        res.status(200).json({
            type: 'succes',
            message: 'Login successfully',
            token,
            userCredentials
        })
   } catch (error) {
        res.status(500).json(error || {
            type: 'error',
            message: 'Invalid credentials, please try again!'
        });
   }
});

router.get('/logout', (req, res) => {
    try {
        res.removeHeader(AUTH_COOKIE_JWT);
        res.removeHeader(USER_CREDENTIALS);
        res.status(200).json({
            type: 'succes',
            message: 'Loged out successfully!'
        });
    } catch (error) {
        res.status(500).json({
            type: 'error',
            message: 'You cannot perform this action'
        });
    }
});

module.exports = router;