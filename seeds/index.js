const sequelize = require('../config/connection');
const { BlogPost, User, Comments } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData');
const commentData = require('./commentData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
 
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await BlogPost.bulkCreate(blogPostData, {
    returning: true,
  });

  await Comments.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
