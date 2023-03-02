// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

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

// //DESCRIPTION: Creating a new blog comment
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newComment = await Comments.create({
//       ...req.body,
//       user_id: req.session.user_id,
//       Date: new Date
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // DESCRIPTION: Creating a new comment
// router.post('/', withAuth, async (req, res) => {
//   try {
//     console.log('inside comment POST request');
//     const id = req.session.user_id;
//     const newComment = await Comments.create(
//       {
//         comment: req.body.comment,
//         blogPost_id: req.body.post_id,
//       },
//       {
//         where: {
//           user_id: id,
//         },
//       }
//     );

//     // console.log('new comment:');
//     // console.log(newComment);
//     const userComment = newComment.get({ plain: true });

//     res.render('blogpost', {
//       userComment,
//       logged_in: req.session.logged_in,
//     });

//     res.status(200).json(userComment);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;
