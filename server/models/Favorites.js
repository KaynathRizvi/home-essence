// models/Favorite.js
module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define('Favorite', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'favorite_item',
    });
  
    return Favorites;
  };
  