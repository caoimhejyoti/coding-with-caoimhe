const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');

// DESCRIPTION: Get all comments for current blog post
router.get('/', async (req, res) => {
  try {
    const commentData = await Comments.findAll({
      where: {
        model: BlogPost,
        attributes: ['id'],
      },
    });

    const coms = commentData.map((coms) => coms.get({ plain: true }));

    res.render('blogPost', {
      coms,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
