const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const updatePostRoutes = require('./updatePostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/updatepost', updatePostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
