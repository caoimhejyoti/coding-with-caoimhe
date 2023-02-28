const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all BlogPosts and JOIN with user data
    const BlogPostData = await BlogPost.findAll({
      where:
      {user_id: req.session.user_id},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const BlogPosts = BlogPostData.map((BlogPost) => BlogPost.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      BlogPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newUserPost = await BlogPost.create({
        user_id: req.session.user_id,
        title: req.body.name,
        blog_text: req.body.content,
        date: new Date,
      });

    console.log(newUserPost);

    res.status(200).json(newUserPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;