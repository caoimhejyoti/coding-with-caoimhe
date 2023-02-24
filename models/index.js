const User = require('./User');
const BlogPost = require('./BlogPost');

// users can have multiple blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// blog post belongs to one user
BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, BlogPost };
