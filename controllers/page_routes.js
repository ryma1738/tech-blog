const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
    }
    res.render('landing-page', req.session.loggedIn);
});

router.get('/home', (req, res) => {
    res.render('home', req.session.loggedIn);
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', req.session.loggedIn);
});

module.exports = router;