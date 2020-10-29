import { remote } from 'electron'
import path from 'path'
import { Model, Sequelize } from 'sequelize'

type Database = {
  Sequelize?: typeof Sequelize;
  sequelize?: Sequelize;
} & {
  [key: string]: typeof Model;
}

const { app } = remote
const DATABASE_PATH = path.join(app.getPath('userData'), 'taggables.sql')
const db: Database = {}

const sequelize = new Sequelize('tally', 'tallyu', null, {
  dialect: 'sqlite',
  storage: DATABASE_PATH
})

const modules = [
  require("../models/media").default
]

modules.forEach((module) => {
  const model = module(sequelize, Sequelize);
  db[model.name] = model;
});

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db