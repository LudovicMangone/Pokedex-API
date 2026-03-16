import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database/sequelize-client.js";

export class Team extends Model {}
Team.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "teams",
        sequelize
    }
)

export default Team