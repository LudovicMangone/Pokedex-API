import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database/sequelize-client.js";

export class Type extends Model {}
Type.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: false
        }
    },
    {
        tableName: "types",
        sequelize
    }
)

export default Type