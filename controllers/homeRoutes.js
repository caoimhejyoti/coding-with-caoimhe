// log in request
// if not logged in - redirect.

const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all BlogPosts and JOIN with user data
    const BlogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const BlogPosts = BlogPostData.map((BlogPost) =>
      BlogPost.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      BlogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogposts/:id', withAuth, async (req, res) => {
  try {
    // console.log('Hello'); //used for debugging purposes
    const BlogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // console.log(BlogPostData); //used for debugging purposes
    const BlogPostInfo = BlogPostData.get({ plain: true });

    res.render('BlogPost', {
      ...BlogPostInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
