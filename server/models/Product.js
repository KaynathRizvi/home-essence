// models/Product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_image: {
        type: DataTypes.STRING,
        allowNull: false
      },
    product_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    product_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, {
    tableName: 'products',   // Use your existing table name
    timestamps: false,       // Set to false if you don't use createdAt/updatedAt columns
    freezeTableName: true    // Prevents Sequelize from pluralizing the table name
  });

  return Product;
};
