import { remote } from 'electron'
import path from 'path'
import Sequelize from 'sequelize'

const { app } = remote

const DATABASE_PATH = path.join(app.getPath('userData'), 'taggables.sql')

let sequelize = null

if (!sequelize) {
  sequelize = new Sequelize('tally', 'tallyu', null, {
    dialect: 'sqlite',
    storage: DATABASE_PATH
  })
}

export const Taggable = sequelize.define('Taggable', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false
  },
  source: {
    type: Sequelize.STRING,
    allowNull: true
  },
  safe: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
})

Taggable.sync()

export default {
  sequelize,
  models: {
    Taggable
  }
}
