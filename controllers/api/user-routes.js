const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/helpers');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']}
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id' }) 
        }
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    /* body = {
        username: 'username',
        password: 'password'
    } */
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(data => {
        req.session.save(() => {
            req.session.user_id = data.id,
            req.session.loggedIn = true;

            res.json(data);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(data => {
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
            res.redirect('/home');
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    });
});

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(data => {
      if (!data) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }
  
      const validPassword = data.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;
        redirect('/dashboard');
        res.json({ user: data, message: 'You are now logged in!' });
      });
    });
  });

  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

  router.put('/:id', withAuth, (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
  
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;