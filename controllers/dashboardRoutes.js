const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all BlogPosts and JOIN with user data
    const BlogPostData = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
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

//COMPLETE! DESCRIPTION: Creating a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newUserPost = await BlogPost.create({
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

//COMPLETE! DESCRIPTION: Deleting specific blog post with ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const chosenId = req.params.id;
    const deletedBlogPost = await BlogPost.destroy({
      where: {
        id: chosenId,
      },
    });

    if (!deletedBlogPost) {
      res.status(404).json({ message: 'No Blog Post with this id!' });
      return;
    }

    deletedBlogPost;
    res.status(200).json({ message: 'Blog Post successfully deleted.' });
  } catch (err) {
    res.status(400).json(err);
  }
});

//DESCRIPTION: updating specific blog post with ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
