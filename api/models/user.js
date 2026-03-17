import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database/sequelize-client.js";

export class User extends Model {}
User.init(
    {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "users",
        sequelize
    }
)

export default User