const router = require('express').Router();
const { Comments, BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

// DESCRIPTION: Get single comment based on id
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comments.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: BlogPost,
        },
      ],
    });

    const commentInfo = commentData.get({ plain: true });

    res.render('updateComment', {
      commentInfo,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DESCRIPTION: delete single comment based on id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const chosenId = req.params.id;
    const deletedComment = await Comments.destroy({
      where: {
        id: chosenId,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'No Comment with this id!' });
      return;
    }

    deletedComment;
    res.status(200).json({ message: 'Commet successfully deleted.' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DESCRIPTION: Creating a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const id = req.session.user_id;
    const newComment = await Comments.create(
      {
        comment: req.body.comment,
        blogPost_id: req.body.post_id,
        user_id: req.session.user_id,
      },
      {
        where: {
          user_id: id,
        },
      }
    );

    const userComment = newComment.get({ plain: true });

    res.render('blogPost', {
      userComment,
      logged_in: req.session.logged_in,
    });

    res.status(200).json(userComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DESCRIPTION: update a comment by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Comments.update(
      { comment: req.body.updatedComment },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost) {
      res.status(404).json({
        message: 'Not able to update comment at this time. Try again later.',
      });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
