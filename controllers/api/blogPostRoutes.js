// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created


const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');



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


module.exports = router;
