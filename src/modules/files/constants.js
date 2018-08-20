import { remote } from 'electron'
import path from 'path'

import Constants from '../../constants'

const { app } = remote

export default {
  TAGGABLE_DIR: path.join(app.getPath('userData'), Constants.TAGGABLES)
}