import React, {ChangeEvent} from 'react';
import UsersTable from "../store/UsersStore";
import UsersStore from "../store/UsersStore";
import {observer} from "mobx-react";
import ModalsStore from "../store/ModalsStore";
import ImgStore from "../store/ImgStore";

export interface IUserCreate {
    id?: number;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    photo: File | string;
    superUser: boolean;
}

const FormInput: React.FC = observer(() => {

    const fileSelectedHandler = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files) {

            UsersTable.setUserPropertyValue(target.id as keyof IUserCreate, target.files[0])
            let reader = new FileReader();
            let file = target.files[0];
            reader.onloadend = () => {
                ImgStore.addImg(file, reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const changeUserProperty = ({target: {value, id, checked}}: ChangeEvent<HTMLInputElement>) => {
        if (id === 'superUser') {
            UsersTable.setUserPropertyValue(id as keyof IUserCreate, checked)
        } else {
            UsersTable.setUserPropertyValue(id as keyof IUserCreate, value)
        }
    }

    return (
        <div className="row">
            <form className="col s12">
                <h3>Создание пользователя</h3>
                <div className="input-field col s6">
                    <input id="name"
                           type="text"
                           className="validate"
                           value={UsersTable.currentUser.name}
                           onChange={changeUserProperty}
                    />
                    <label className="active" htmlFor="name">Имя</label>
                </div>
                <div className="input-field col s6">
                    <input id="email"
                           type="email"
                           className="validate"
                           value={UsersTable.currentUser.email}
                           onChange={changeUserProperty}
                    />
                    <label className="active" htmlFor="email">Email</label>
                </div>
                <div className="input-field col s6">
                    <input
                        id="phone"
                        type="text"
                        className="validate"
                        value={UsersTable.currentUser.phone}
                        onChange={changeUserProperty}
                    />
                    <label className="active" htmlFor="phone">Телефон</label>
                </div>
                <div className="input-field col s6">
                    <input
                        id="birthday"
                        type="date"
                        className="validate"
                        value={UsersTable.currentUser.birthday}
                        onChange={changeUserProperty}
                    />
                    <label className="active" htmlFor="birthday">День рождение</label>
                </div>
                <div className="switch input-field col s6">
                    <label>
                        Off
                        <input id="superUser"
                               type="checkbox"
                               checked={UsersTable.currentUser.superUser}
                               onChange={changeUserProperty}
                        />
                        <span className="lever"/>
                        Супер пользователь
                    </label>

                </div>
                <div className="input-field col s6">
                    <div className="img-holder">
                        <img src={ImgStore.imagePreviewUrl as string} alt="" id="img" className="img"/>
                    </div>
                    <input
                        id="photo"
                        type="file"
                        className="validate"
                        accept={'.png, .jpg'}
                        onChange={fileSelectedHandler}
                    />
                    <label className=" active" htmlFor="photo">Фото</label>
                </div>
                <div className="input-field col s12">
                    <button type={"button"} onClick={() => ModalsStore.editModal.close()}
                            className="btn waves-effect waves-light mx-1">Отмена
                    </button>
                    {!UsersStore.editForm ?
                        <button type={"button"} onClick={() => {
                            UsersTable.addUser()
                            ModalsStore.editModal.close()
                        }} className="btn waves-effect waves-light mx-1">Сохранить
                        </button>
                        :
                        <button type={"button"} onClick={() => {
                            UsersTable.editUser()
                            UsersStore.closeEditForm()
                            ModalsStore.editModal.close()
                        }} className="btn waves-effect waves-light mx-1">Изменить
                        </button>
                    }
                </div>
            </form>
        </div>
    );
})

export default FormInput;