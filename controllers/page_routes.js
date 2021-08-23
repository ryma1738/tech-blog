const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, Comment, User} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
        res.redirect('/home');
        return;
    }
    res.render('landing-page', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/home', (req, res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({plain: true}));
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn   
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({plain: true}));
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            posts   
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;