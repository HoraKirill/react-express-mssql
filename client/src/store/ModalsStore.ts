import {makeAutoObservable} from "mobx";
import ModalState from "./ModalState";

class ModalsStore {
    deleteModal = new ModalState()
    editModal = new ModalState()

    constructor() {
        makeAutoObservable(this)
    }
}

export default new ModalsStore();