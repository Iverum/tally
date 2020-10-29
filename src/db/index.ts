import models from './models'
import Media, { MediaAttributes } from "./models/media"

const { sequelize } = models

export { Media, MediaAttributes, sequelize as default }