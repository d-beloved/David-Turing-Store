/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    'customer_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'password': {
      type: DataTypes.STRING(150),
      allowNull: false,
      comment: "null"
    },
    'credit_card': {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "null"
    },
    'address_1': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'address_2': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'city': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'region': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'postal_code': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'country': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'shipping_region_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      comment: "null"
    },
    'day_phone': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'eve_phone': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    },
    'mob_phone': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    }
  }, {
    timestamps: false,
    tableName: 'customer'
  });
};
