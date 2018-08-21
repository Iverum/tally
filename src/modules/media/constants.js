import { remote } from 'electron'
import path from 'path'

import { TAGGABLES } from '../../constants'

const { app } = remote

export const TAGGABLES_DIR = path.join(app.getPath('userData'), TAGGABLES)

export default {
  TAGGABLES_DIR
}
