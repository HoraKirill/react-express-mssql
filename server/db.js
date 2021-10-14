import {Sequelize} from "sequelize";

export default new Sequelize(
    'testBd',
    'test1',
    'test1',
    {
        host: 'localhost',
        dialect: 'mssql',
            port: "1433"
});