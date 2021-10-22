import {makeAutoObservable} from "mobx";
import {toast} from "react-toastify";

class ToastNotification {
    constructor() {
        makeAutoObservable(this)
    }
    toastMessage(message: string) {
        toast(`${message}`)
    }
}

export default new ToastNotification();