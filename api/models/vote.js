import {DataTypes, Model} from "sequelize";
import { sequelize } from "../database/sequelize-client.js";

export class Vote extends Model {}
Vote.init({},{
    tableName: "votes",
    sequelize
})

export default Vote;
