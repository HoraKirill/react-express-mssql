import React from 'react';
import TableList, {IColumn} from "./components/TableList";
import {User} from "./models/User";
import ModalWindow from "./components/ModalWindow";
import FormInput, {IUserCreate} from "./components/FormInput";
import UserFilter from "./components/UserFilter";
import {ECellType} from "./components/TableCell";
import {IActions} from "./components/TableRow";
import ModalUserDelete from "./components/ModalUserDelete";
import {observer} from "mobx-react";
import UsersStore from "./store/UsersStore";
import ModalsStore from "./store/ModalsStore";
import ImgStore from "./store/ImgStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = observer(() => {

        const columns: IColumn[] = [
            {
                field: 'name',
                name: "Имя"
            },
            {
                field: 'email',
                name: "Email"
            },
            {
                field: 'phone',
                name: "Телефон"
            },
            {
                field: 'birthday',
                name: "Днюха"
            },
            {
                field: 'photo',
                name: "Фото",
                cellType: ECellType.image
            },
            {
                field: 'superUser',
                name: "Админ",
                cellType: ECellType.boolean,
                labelsMapping: {
                    true: "Да",
                    false: "Нет"
                }
            },
        ];

        const actions: IActions<User>[] = [
            {
                icon: <i className="material-icons"> edit </i>,
                onClick: (row) => {
                    UsersStore.setUserCurrent(row as IUserCreate)
                    ImgStore.setImgPhoto()
                    UsersStore.formEditOpen()
                    ModalsStore.editModal.formOpen()
                }
            },
            {
                icon: <i className="material-icons"> delete </i>,
                onClick: (row) => {
                    UsersStore.setUserCurrent(row as IUserCreate)
                    ModalsStore.deleteModal.formOpen()
                }
            },
        ]

        return (
            <div className="App">
                <div className="container">
                    <h1>Table Users</h1>
                    <button className="btn col mx-1" onClick={() => ModalsStore.editModal.formOpen()}>New User</button>
                    <UserFilter
                    />
                    <TableList
                        items={UsersStore.users}
                        columns={columns}
                        actions={actions}
                    />
                </div>
                <ModalWindow isOpen={ModalsStore.editModal.open} onClose={() => ModalsStore.editModal.formClose()}>
                    <FormInput/>
                </ModalWindow>
                <ModalWindow isOpen={ModalsStore.deleteModal.open} onClose={() => ModalsStore.deleteModal.formClose()}>
                    <ModalUserDelete/>
                </ModalWindow>
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                />
            </div>
        );
    }
)

export default App;
