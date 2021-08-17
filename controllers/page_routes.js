const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/home');
    }
    res.render('landing-page', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/home', (req, res) => {
    res.render('home', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;