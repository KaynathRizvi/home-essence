const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user_accounts', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    user_contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_pass: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
    tableName: 'user_accounts',   // Use your existing table name
    timestamps: false,       // Set to false if you don't use createdAt/updatedAt columns
    freezeTableName: true    // Prevents Sequelize from pluralizing the table name
  });

  return User;
};
