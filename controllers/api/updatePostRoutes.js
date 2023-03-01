const router = require('express').Router();
const { Model } = require('sequelize');
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

// WORKING! DESCRIPTION: get one blog post from id
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

// DESCRIPTION: update a blog post by its `id` value
// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     console.log('Hello in get function (update.js)'); //use for debugging
//     const BlogPostData = await BlogPost.findByPk(
//       req.params.id,
//       {
//         include: [
//           {
//             model: User,
//             attributes: ['name'],
//           },
//         ],
//       },
//     );
//     console.log(BlogPostData);
//     const BlogPostInfo = BlogPostData.get({ plain: true });

//     res.render('updatepost', {
//       ...BlogPostInfo,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// DESCRIPTION: update a category by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const updatedPost = await BlogPost.update({
      title: req.body.updatedName,
      blog_text: req.body.updatedContent,
      where: {
        id: req.params.id,
        user_id: req.params.user,
        date: new Date()
      }
    })
    if (!updatedPost) {
      res.status(404).json({ message: 'Not able to update post at this time. Try again later.' });
      return;
    }

    // console.log(updatedPost);
    // const post = updatedPost.get({ plain: true });
    // res.render('updatepost', {
    //   ...post,
    //   logged_in: req.session.logged_in});
    
    res.status(200).json(updatedPost);

  } catch (err) {
    console.log(err); //used for debugging
    res.status(500).json(err);
  }
});


module.exports = router;
