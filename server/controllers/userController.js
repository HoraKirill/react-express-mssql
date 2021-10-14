import User from "../models/models.js";
import {v4} from "uuid";
import path from "path";
import fs from 'fs'
import pkg from "sequelize"
import {milliseconds, format} from 'date-fns'


const {Op} = pkg;


let __dirname = path.resolve();

export default class UserController {

    static async getUsers(req, res) {
        let {query, queryType, superUser, age} = req.body

        const filter = () => {
            let where = {}
            if (age) {
                const maturityDate = format((new Date() - milliseconds({years: 18})), 'yyyy-dd-MM')
                console.log(age)
                where.birthday = {
                    [age === 'adult' ? Op.gte : Op.lt]: maturityDate,
                }
            }

            if (query) {
                    where[queryType] = {
                            [Op.startsWith]: query
                        }
            }

            if (superUser) {
                where.superUser = superUser === 'admin'
            }
            return where
        }
        const users = await User.findAll({where: filter()})
        return res.status(200).json(users)
    }


    static async newUser(req, res) {
        try {
            const {name, email, phone, birthday, superUser} = req.body
            let fileName = ''
            if (req.files) {
                const {photo} = req.files
                fileName = v4() + '.jpg'
                photo.mv(path.resolve(__dirname, 'static', fileName))
            }
            const user = await User.create({name, email, phone, birthday, photo: fileName, superUser})
            return res.status(201).json(user)
        } catch (e) {
            console.log(e)
        }
    }

    static async deleteUser(req, res) {
        try {
            const {id, photo} = req.body
            await User.destroy({
                where: {id},
            })
            fs.unlink(`static/${photo}`, (err) => {
                if (err) throw err;
                console.log('Deleted');
            });
            return res.json('delete')
        } catch (e) {
            console.log(e)
        }
    }

    static async editUser(req, res) {
        try {
            const {id, name, email, phone, birthday, superUser} = req.body
            let fileName = ''
            let userBase = await User.findAll({
                where: {
                    id: id
                }
            })
            console.log(req.files)
            if (req.files !== null) {
                fs.unlink(`static/${userBase[0].photo}`, (err) => {
                    if (err) throw err;
                    console.log('Deleted');
                });
                const {photo} = req.files
                fileName = v4() + '.jpg'
                photo.mv(path.resolve(__dirname, 'static', fileName))
            } else {
                fileName = userBase.photo
            }
            const user = await User.update({
                name: name,
                email: email,
                phone: phone,
                birthday: birthday,
                photo: fileName,
                superUser: superUser
            }, {where: {id: id}})
            return res.status(201).json(user)
        } catch (e) {
            console.log(e)
        }
    }
}
