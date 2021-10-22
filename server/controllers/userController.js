import User from "../models/UserModel.js";
import {v4} from "uuid";
import path from "path";
import fs from 'fs'
import pkg from "sequelize"
import {milliseconds, format} from 'date-fns'
import config from "../config.js";

const {Op} = pkg;


 const _photoDelete = (photo) =>  {
    fs.unlink(`static/${photo}`, (err) => {
        if (err) throw err;
    });
}

const _photoCreate = (photo) =>  {
    const fileName = v4() + '.jpg'
    photo.mv(path.resolve(config.__dirname, config.imgPath, fileName))
    return fileName
}

export default class UserController {

    static async getUsers(req, res) {
        const {query, queryType, superUser, age} = req.body
        const where = {}

        if (age) {
            const maturityDate = format((new Date() - milliseconds({years: 18})), 'yyyy-dd-MM')
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

        const users = await User.findAll({where})
        return res.status(200).json(users)
    }


    static async userCreate(req, res) {
        try {
            let fileName = null
            if (req.files) {
                fileName = _photoCreate(req.files.photo)
            }
            const user = await User.create({...req.body, photo: fileName})
            return res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async userDelete(req, res) {
        try {
            const {id, photo} = req.body
            await User.destroy({
                where: {id},
            })
            if (photo) {
                _photoDelete(photo)
            }
            return res.status(200).json('deleted')
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async userEdit(req, res) {
        const userCurrent = req.body
        try {
            let fileName
            const userBase = await User.findByPk(userCurrent.id)
            if (req.files) {
                _photoDelete(userBase.photo)
                fileName = _photoCreate(req.files.photo)
            } else {
                fileName = userBase.photo
            }
            const user = await User.update({
                name: userCurrent.name,
                email: userCurrent.email,
                phone: userCurrent.phone,
                birthday: userCurrent.birthday,
                photo: fileName,
                superUser: userCurrent.superUser
            }, {where: {id: userCurrent.id}})
            return res.status(200).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}
