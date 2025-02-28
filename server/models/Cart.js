// models/Cart.js
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_accounts',  // The target model/table name
        key: 'user_id'           // The primary key in that table
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',       // The target model/table name
        key: 'product_id'        // The primary key in that table
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    tableName: 'cart_item',
    timestamps: true,
    freezeTableName: true
  });

  return Cart;
};
