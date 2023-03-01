const router = require('express').Router();
const { Model } = require('sequelize');
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// DESCRIPTION: get one blog post from id
router.get('/:id', withAuth, async (req, res) => {
  // find one blog post by its `id` value
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
    console.log('hello');
    console.log(blogPostData);
    if (!blogPostData) {
      res.status(404).json({ message: 'No Blog found with that id' });
      return;
    }

    const BlogPostInfo = blogPostData.get({ plain: true });

    res.render('updatepost', {
      BlogPostInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // DESCRIPTION: update a blog post by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('Hello in get function (update.js)'); //use for debugging
    const BlogPostData = await BlogPost.findByPk(
      req.params.id,
      {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      },
      console.log(BlogPostData)
    );
    console.log(BlogPostData);
    const BlogPostInfo = BlogPostData.get({ plain: true });

    res.render('BlogPost', {
      ...BlogPostInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
