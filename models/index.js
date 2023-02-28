const User = require('./User');
const BlogPost = require('./BlogPost');
const Comments = require('./Comment');

// users can have multiple blog posts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// blog post belongs to one user
BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

// blog post can have multiple comments
BlogPost.hasMany(Comments, {
  foreignKey: 'blogPost_id',
  onDelete: 'CASCADE'
});

// comments belongs to one blog post
Comments.belongsTo(BlogPost, {
  foreignKey: 'blogPost_id'
});

module.exports = { User, BlogPost, Comments };
