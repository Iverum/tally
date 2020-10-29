import { remote } from 'electron'
import path from 'path'
import { Sequelize } from 'sequelize'

import Media, { MediaTable } from "../models/media"

type Database = {
  Media?: typeof Media;
  Sequelize?: typeof Sequelize;
  sequelize?: Sequelize;
}

const { app } = remote
const DATABASE_PATH = path.join(app.getPath('userData'), 'taggables.sql')
const db: Database = {}

const sequelize = new Sequelize('tally', 'tallyu', null, {
  dialect: 'sqlite',
  storage: DATABASE_PATH
})

Media.init(MediaTable, { sequelize, tableName: "Media" })
db.Media = Media;

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db