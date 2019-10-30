'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    gambar: DataTypes.STRING,
    description: DataTypes.STRING(2048),
    harga: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};