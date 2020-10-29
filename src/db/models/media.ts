import { DataTypes, Sequelize } from "sequelize"

export default (sequelize: Sequelize) => {
  const Media = sequelize.define('Media', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING
    },
    safe: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    source: {
      allowNull: true,
      type: DataTypes.STRING
    }
  })

  // Media.associate = function associate(models: { Tag: any }) {
  //   Media.belongsToMany(models.Tag, { as: 'tags', through: 'ItemTag' })
  // }

  return Media
}