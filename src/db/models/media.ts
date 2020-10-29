import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";

export interface MediaAttributes {
  id: number;
  nsfw: boolean;
  path: string;
  source?: string;
}

interface MediaCreationAttributes extends Optional<MediaAttributes, "id"> { }

export const MediaTable = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true
  },
  nsfw: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  path: {
    allowNull: false,
    type: DataTypes.STRING
  },
  source: {
    allowNull: true,
    type: DataTypes.STRING
  }
}

class Media extends Model<MediaAttributes, MediaCreationAttributes> implements MediaAttributes {
  public id: number;
  public nsfw: boolean;
  public path: string;
  public source: null | string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  plain() {
    return {
      id: this.id,
      nsfw: this.nsfw,
      path: this.path,
      source: this.source
    }
  }
}

export default Media;
