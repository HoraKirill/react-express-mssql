import sequelize from "../db.js";
import Sequelize from "sequelize";

const {DataTypes} = Sequelize;

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 10]
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            is: /^((\+7|7|8)+([0-9]){10})$/
        }
    },
    birthday: {
        type: DataTypes.STRING,
        validate: {
            is: /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/
        }
    },
    photo: {
        type: DataTypes.STRING
    },
    superUser: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'userTable'
})

export default User;