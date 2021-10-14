import {makeAutoObservable} from "mobx";
import UsersStore from "./UsersStore";

interface IImg {
    file?: File;
    imagePreviewUrl: string | ArrayBuffer | null;
}

class ImgStore implements IImg {

    file?: File = undefined;
    imagePreviewUrl: string | ArrayBuffer | null = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    constructor() {
        makeAutoObservable(this)
    }

    addImg(file: File, imagePreviewUrl: string | ArrayBuffer | null) {
        this.file = file
        this.imagePreviewUrl = imagePreviewUrl
    }

    setImgPhoto() {
        this.imagePreviewUrl = 'http://localhost:3001/' + UsersStore.currentUser.photo
    }

    clearImg() {
        this.imagePreviewUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
}

export default new ImgStore();