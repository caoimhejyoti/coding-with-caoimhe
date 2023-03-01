const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const updatePostRoutes = require('./updatePostRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogPostRoutes);
router.use('/updatepost', updatePostRoutes);

module.exports = router;
