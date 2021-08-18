const router = require('express').Router();
const { Post, Comment, User} = require('../../models')

router.get('/', (req, res) => {
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
    .then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['id', 'text'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            }
        ]
    }).then(data => {
        if (!data) {
            res.status(404).json({ message: 'No Post found with this id' }) 
        }
        res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    /* body = {
        title: Jquery syntax,
        content: lorem ram has lse lao...
    } */
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }).then(data => res.json(data)).catch(err => {
        console.log(err);
        res.status(500).json(err);
    }); 
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({message: 'No Post found with this id!'})
        }
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (!data) {
            res.status(404).json({message: 'No Post Found with that Id!'})
        }
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    })
});


module.exports = router;