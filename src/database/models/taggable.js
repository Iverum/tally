export default (sequelize, DataTypes) => {
  const Taggable = sequelize.define('Taggable', {
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

  Taggable.associate = function associate(models) {
    Taggable.belongsToMany(models.Tag, { as: 'tags', through: 'ItemTag' })
  }

  return Taggable
}
