const sequelize = require('../config/connection');
// const chalk = require('chalk');
const { BlogPost, User, Comments } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData');
// const seedBlogPost = require('./blogPostData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
 
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await BlogPost.bulkCreate(blogPostData, {
    returning: true,
  });

  // await seedBlogPost();


  process.exit(0);
};

seedDatabase();
