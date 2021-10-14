import sequelize from "../db.js";
import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.INTEGER},
    birthday: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING},
    superUser: {type: DataTypes.BOOLEAN}
}, {
    tableName: 'userTable'
})

export default User