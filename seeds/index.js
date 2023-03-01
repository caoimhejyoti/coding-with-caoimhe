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

  console.log('--------------User DATA SEEDED--------------');

  await BlogPost.bulkCreate(blogPostData, {
    returning: true,
  });

  console.log('--------------BlogPost DATA SEEDED--------------');

  await Comments.bulkCreate(commentData, {
    returning: true,
  });

  console.log('--------------Comment DATA SEEDED--------------');
  console.log('--------------ALL DATA SEEDED--------------');

  process.exit(0);
};

seedDatabase();
