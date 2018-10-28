export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    description: {
      type: DataTypes.TEXT
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })

  Tag.associate = function associate(models) {
    Tag.belongsToMany(models.Taggable, { through: 'ItemTag' })
  }

  return Tag
}
