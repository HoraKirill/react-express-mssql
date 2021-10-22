import {action, makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {IUserCreate} from "../components/FormInput";
import {User} from "../models/User";
import ToastNotification from "../components/ToastNotification";

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
            userAdd: action.bound
        })
    }

    async dataFetch() {
        const res = await axios.post('http://localhost:3001/users')
        runInAction(() => {
            this.users = res.data
        })
    }

    setUserPropertyValue<K extends keyof IUserCreate, V extends IUserCreate[K]>(property: K, value: V) {
        this.currentUser[property] = value
    }

    async userAdd() {
        try {
            let formData = new FormData()
            Object.entries(this.currentUser).forEach(item => {
                formData.append(item[0], item[1]);
            });
            const {data}: { data:User } = await axios.post('http://localhost:3001/create', formData)
            this.users.push(data)
        } catch (e: any) {
            ToastNotification.toastMessage(e.message as string)
        }
        this.userCurrentClear()
    }

    async userEdit() {
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
        } catch (e:any) {
            ToastNotification.toastMessage(e.message as string)
        }
        this.userCurrentClear()
    }

    async userDelete() {
        try {
            await axios.delete('http://localhost:3001/delete', {data: this.currentUser})
            this.dataFetch()
            this.userCurrentClear()
        } catch (e:any) {
            ToastNotification.toastMessage(e.message as string)
        }
    }

    setUserCurrent (user: IUserCreate) {
        this.currentUser = user
    }

    userCurrentClear () {
        this.currentUser = defaultUser
    }

    formEditOpen () {
        this.editForm = true
    }

    formEditClose () {
        this.editForm = false
    }

    usersFilter (e:User[]) {
        this.users = e
    }
}

export default new UsersStore();