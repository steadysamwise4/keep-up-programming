const router = require('express').Router();
const { Link, User } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    Link.findAll({
        attributes: ['id', 'title', 'description', 'link_url', 'created_at'],
        include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
    })
    .then(dbLinkData => res.json(dbLinkData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // Get one post by it's id
  router.get('/:id', (req, res) => {
    Link.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'description', 'link_url', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbLinkData => {
        if (!dbLinkData) {
          res.status(404).json({ message: 'No link found with this id' });
          return;
        }
        res.json(dbLinkData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', (req, res) => {
    // expects {title: 'The fundamentals of security incident response', 
    //description: 'Read about the ongoing battle between business and cybercriminals',
    // author: 'Chris Pratt', 
    // post_url: 'https://www.hpe.com', user_id: 1}
    Link.create({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      link_url: req.body.link_url,
      user_id: req.body.user_id
    })
      .then(dbLinkData => res.json(dbLinkData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;