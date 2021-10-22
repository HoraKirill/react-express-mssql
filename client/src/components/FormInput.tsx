import React, {ChangeEvent} from 'react';
import UsersTable from "../store/UsersStore";
import UsersStore from "../store/UsersStore";
import {observer} from "mobx-react";
import ModalsStore from "../store/ModalsStore";
import ImgStore from "../store/ImgStore";
import ValidationForm from "./ValidationForm";

export interface IUserCreate {
    id?: number;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    photo: File | string;
    superUser: boolean;
}

const validName = new ValidationForm({required: true, minLength: 3})
const validEmail = new ValidationForm({isEmail: true})
const validPhone = new ValidationForm({isPhone: true})
const validBirthday = new ValidationForm({isDate: true})

// class Validators {
//     required (value: any): boolean {
//         return value
//     }
//
//     minLength(length: string) {
//
//     }
// }

const FormInput: React.FC = observer(() => {

    const fileSelectedHandler = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            let file = target.files[0];
            UsersTable.setUserPropertyValue(target.id as keyof IUserCreate, file)
            let reader = new FileReader();
            reader.onloadend = () => {
                ImgStore.imgAdd(file, reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const userPropertyChange = ({target: {value, id, checked}}: ChangeEvent<HTMLInputElement>) => {
        if (id === 'superUser') {
            UsersTable.setUserPropertyValue(id as keyof IUserCreate, checked)
        } else {
            UsersTable.setUserPropertyValue(id as keyof IUserCreate, value)
        }
        validName.useValidation()
    }

    validName.value = UsersTable.currentUser.name
    validEmail.value = UsersTable.currentUser.email
    validPhone.value = UsersTable.currentUser.phone
    validBirthday.value = UsersTable.currentUser.birthday

    return (
        <div className="row">
            <form className="col s12">
                <h3 className="title">Создание пользователя</h3>
                <div className="input-field col s6">
                    <input
                        onBlur={validName.onBlur}
                        id="name"
                        type="text"
                        className="validate"
                        value={UsersTable.currentUser.name}
                        onChange={userPropertyChange}
                    />
                    {(validName.isDirty && validName.errorType)
                        ? <label className="active" data-error="wrong"
                                 style={{color: 'red'}}>{validName.errorType}</label>
                        : <label className="active" htmlFor="name">Имя</label>}
                </div>
                <div className="input-field col s6">
                    <input
                        onBlur={validEmail.onBlur}
                        id="email"
                        type="email"
                        className="validate"
                        value={UsersTable.currentUser.email}
                        onChange={userPropertyChange}
                    />
                    {(validEmail.isDirty && validEmail.errorType)
                        ? <label className="active" data-error="wrong"
                                 style={{color: 'red'}}>{validEmail.errorType}</label>
                        : <label className="active" htmlFor="email">Email</label>}
                </div>
                <div className="input-field col s6">
                    <input
                        onBlur={validPhone.onBlur}
                        id="phone"
                        type="text"
                        className="validate"
                        value={UsersTable.currentUser.phone}
                        onChange={userPropertyChange}
                    />
                    {(validPhone.isDirty && validPhone.errorType)
                        ? <label className="active" data-error="wrong"
                                 style={{color: 'red'}}>{validPhone.errorType}</label>
                        : <label className="active" htmlFor="phone">Телефон</label>}
                </div>
                <div className="input-field col s6">
                    <input
                        onBlur={validBirthday.onBlur}
                        id="birthday"
                        type="date"
                        className="validate"
                        value={UsersTable.currentUser.birthday}
                        onChange={userPropertyChange}
                    />
                    {(validBirthday.isDirty && validBirthday.errorType)
                        ? <label className="active" data-error="wrong"
                                 style={{color: 'red'}}>{validBirthday.errorType}</label>
                        : <label className="active" htmlFor="birthday">День рождение</label>}
                </div>
                <div className="switch input-field col s6">
                    <label>
                        Off
                        <input id="superUser"
                               type="checkbox"
                               checked={UsersTable.currentUser.superUser}
                               onChange={userPropertyChange}
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
                    <button type={"button"} onClick={() => ModalsStore.editModal.formClose()}
                            className="btn waves-effect waves-light mx-1">Отмена
                    </button>
                    {!UsersStore.editForm ?
                        <button disabled={
                            !validName.inputValid ||
                            !validEmail.inputValid ||
                            !validPhone.inputValid ||
                            !validBirthday.inputValid
                        }
                                type={"button"}
                                onClick={() => {
                                    UsersTable.userAdd()
                                    ModalsStore.editModal.formClose()
                                }}
                                className="btn waves-effect waves-light mx-1">Сохранить
                        </button>
                        :
                        <button disabled={
                            !validName.inputValid ||
                            !validEmail.inputValid ||
                            !validPhone.inputValid ||
                            !validBirthday.inputValid
                        }
                                type={"button"}
                                onClick={() => {
                                    UsersTable.userEdit()
                                    UsersStore.formEditClose()
                                    ModalsStore.editModal.formClose()
                                }}
                                className="btn waves-effect waves-light mx-1">Изменить
                        </button>
                    }
                </div>
            </form>
        </div>
    );
})

export default FormInput;