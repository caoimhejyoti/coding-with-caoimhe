const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/blog-posts', blogPostRoutes);
router.use('/dashboards', dashboardRoutes);

module.exports = router;
