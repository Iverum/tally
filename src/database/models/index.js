import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const { app } = remote
const DATABASE_PATH = path.join(app.getPath('userData'), 'taggables.sql')
const basename = path.basename(__filename);
const db = {}

const sequelize = new Sequelize('tally', 'tallyu', null, {
  dialect: 'sqlite',
  storage: DATABASE_PATH,
  operatorsAliases: false
})

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db
