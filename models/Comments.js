const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const BlogPost = require('./BlogPost');

// DESCRIPTION: Initialize Comments model (table) by extending off Sequelize's Model class
class Comments extends Model {}

// DESCRIPTION: set up fields and rules for Comments model
Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        blogPost_id:{
            type: DataTypes.INTEGER,
            references:{ 
              model: BlogPost,
              key: 'id',
            //   unique: false FIXME: confirm
            }
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    }
);

module.exports = Comments;