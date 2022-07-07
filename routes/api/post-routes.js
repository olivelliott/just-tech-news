const router = require('express').Router();
const { Post, User } = require('../../models');

//  GET all users
router.get('/', (req, res) => {
    console.log('========================');
    Post.findAll({
        // Query config
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
        id: req.params.id,
        },
        attributes: ["id", "post_url", "title", "created_at"],
        include: [
        {
            model: User,
            attributes: ["username"],
        },
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }

        res.json(dbPostData);
        })
        
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;