const router = require('express').Router();
const { Model } = require('sequelize');
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');


// DESCRIPTION: get one category from id
router.get('/:id', withAuth, async (req, res) => {
    // find one category by its `id` value
    try{
      const blogPostData = await BlogPost.findByPk(req.params.id);
  
      if(!blogPostData){
        res.status(404).json({message: 'No Blog found with that id'});
        return;
      }
      
      res.render('updatepost', {
        blogPostData,
        logged_in: req.session.logged_in
      });
    }catch (err){
      res.status(500).json(err);
    }
    
  });




module.exports = router;