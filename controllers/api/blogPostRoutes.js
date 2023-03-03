const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  console.log('inside get comments fnc');
  try {
    const commentData = await Comments.findAll({
      where: {
        model: BlogPost,
        attributes: ['id'],
      },
    });

    // Serialize data so the template can read it
    const coms = commentData.map((coms) => coms.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('blogPost', {
      coms,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
