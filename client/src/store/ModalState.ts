import {makeAutoObservable} from "mobx";
import UsersStore from "./UsersStore";
import ImgStore from "./ImgStore";

export default class ModalState {
    open = false

    constructor() {
        makeAutoObservable(this)
    }

    formOpen() {
        this.open = true
    }

    formClose() {
        this.open = false
        UsersStore.userCurrentClear()
        ImgStore.imgClear()
    }
}

