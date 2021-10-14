import {makeAutoObservable} from "mobx";
import UsersStore from "./UsersStore";
import ImgStore from "./ImgStore";

export default class ModalState {
    open = false

    constructor() {
        makeAutoObservable(this)
    }

    openForm() {
        this.open = true
    }

    close() {
        this.open = false
        UsersStore.clearCurrentUser()
        ImgStore.clearImg()
    }
}

