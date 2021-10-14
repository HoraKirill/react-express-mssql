import {action, makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {IUserCreate} from "../components/FormInput";
import {User} from "../models/User";

const defaultUser: IUserCreate = {
    birthday: "",
    email: "",
    name: "",
    phone: "",
    photo: undefined as unknown as File,
    superUser: false
}

class UsersStore {
    users: User[] = []
    currentUser = defaultUser
    editForm = false

    constructor() {
        makeAutoObservable(this, {
            addUser: action.bound
        })
    }

    async fetchData() {
        const res = await axios.post('http://localhost:3001/users')
        runInAction(() => {
            this.users = res.data
        })
    }

    setUserPropertyValue(property: keyof IUserCreate, value: any) {
        // @ts-ignore
        this.currentUser[property] = value
    }

    async addUser() {
        try {
            let formData = new FormData()
            Object.entries(this.currentUser).forEach(item => {
                formData.append(item[0], item[1]);
            });
            const {data}: { data:User } = await axios.post('http://localhost:3001/create', formData)
            this.users.push(data)
        } catch (e) {
            console.log(e)
        }
        this.clearCurrentUser()
    }

    async editUser() {
        try {
            let formData = new FormData()
            Object.entries(this.currentUser).forEach(item => {
                formData.append(item[0], item[1]);
            });
            const {data}: { data:User } = await axios.post('http://localhost:3001/edit', formData)
            this.users.map((user) => {
                if (user.id === data.id) {
                    return data
                } else {
                    return user;
                }
            })
        } catch (e) {
            console.log(e)
        }
        this.clearCurrentUser()
    }

    async deleteUser() {
        try {
            await axios.delete('http://localhost:3001/delete', {data: this.currentUser})
            this.fetchData()
            this.clearCurrentUser()
        } catch (e) {
            console.log(e)
        }
    }

    setCurrentUser (user: IUserCreate) {
        this.currentUser = user
    }

    clearCurrentUser () {
        this.currentUser = defaultUser
    }

    openEditForm () {
        this.editForm = true
    }

    closeEditForm () {
        this.editForm = false
    }

    filterUsers (e:User[]) {
        this.users = e
    }
}

export default new UsersStore();