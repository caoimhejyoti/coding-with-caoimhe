// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created


const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');


// router.get('/', async (req, res) => {
//   try{
//     const blogPost = await BlogPost.findAll({
//       include: [{model: User}],
//     });
//     res.status(200).json(blogPost);
//   }catch (err){
//     res.status(500).json(err);
//   }
  
// });

// router.get('/:id', async (req, res) => {
  
//   try{
//     const blogPost = await BlogPost.findByPk({
//       where: {
//         id: req.params.id
//       },
//       include: [{model: User}],
//     });
//     res.render(blogPost);
//   }catch (err){
//     res.status(500).json(err);
//   }
  
// });


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  const chosenId = req.params.id;
  const userId = req.session.user_id;
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: chosenId,
        user_id: userId,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No Blog Post found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
