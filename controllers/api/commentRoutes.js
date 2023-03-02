const router = require('express').Router();
const { Comments } = require('../../models');

// const withAuth = require('../utils/auth');

// // DESCRIPTION: Creating a new comment
// router.post('/:id', withAuth, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const newComment = await Comments.create({
//       user_id: req.session.user_id,
//       comment: req.body.name,
//       blogPost_id: id,
//       date: new Date(),
//     });

//     console.log(newComment);

//     res.status(200).json(newComment);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;
