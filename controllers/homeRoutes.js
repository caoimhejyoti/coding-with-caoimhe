const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// DESCRIPTION: Get all blog posts
router.get('/', async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const BlogPosts = BlogPostData.map((BlogPost) =>
      BlogPost.get({ plain: true })
    );

    res.render('homepage', {
      BlogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DESCRIPTION: Get post comment based on id
router.get('/blogposts/:id', async (req, res) => {
  try {
    const BlogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: { model: User },
        },
      ],
    });
    const BlogPostInfo = BlogPostData.get({ plain: true });
    res.render('blogPost', {
      ...BlogPostInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DESCRIPTION: Route to get to dashboard - only accessible when logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DESCRIPTION: If the user is already logged in, redirect the request to another route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
