const router = require('express').Router();
const { Comments } = require('../../models');

const withAuth = require('../utils/auth');




// DESCRIPTION: Creating a new comment
router.post('/:id', withAuth, async (req, res) => {
    try {
      const newUserPost = await Comments.create({
        user_id: req.session.user_id,
        title: req.body.name,
        blog_text: req.body.content,
        date: new Date(),
      });
  
      console.log(newUserPost);
  
      res.status(200).json(newUserPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;