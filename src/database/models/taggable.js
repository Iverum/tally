export default (sequelize, DataTypes) => {
  const Taggable = sequelize.define('Taggable', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    safe: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  })

  return Taggable
}
