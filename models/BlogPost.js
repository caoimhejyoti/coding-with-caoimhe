const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// DESCRIPTION: Initialize BlogPost model (table) by extending off Sequelize's Model class
class BlogPost extends Model {}

// DESCRIPTION: set up fields and rules for BlogPost model
BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id:{
            type: DataTypes.INTEGER,
            references:{ 
              model: User,
              key: 'id',
              unique: false
            }
        }
    }
);

module.exports = BlogPost;