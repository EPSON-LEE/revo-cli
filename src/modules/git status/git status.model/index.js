
  const { Sequelize, DataTypes, Model } = require('sequelize')
  const { sequelize } = require('@config/database')

  const TABLE_NAME = 'git status';
  // 定义模型
  const  Git status = sequelize.define(TABLE_NAME, {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    gender: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    updated_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: false,
    freezeTableName: true                           // 禁用自动添加 "s" 后缀
  })

  module.exports = Git status
  