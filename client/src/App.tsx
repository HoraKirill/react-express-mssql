import React from 'react';
import TableList, {IColumn} from "./components/TableList";
import {User} from "./models/User";
import ModalWindow from "./components/ModalWindow";
import FormInput, {IUserCreate} from "./components/FormInput";
import FilterUser from "./components/FilterUser";
import {ECellType} from "./components/TableCell";
import {IActions} from "./components/TableRow";
import DeleteEvent from "./components/DeleteEvent";
import {observer} from "mobx-react";
import UsersStore from "./store/UsersStore";
import ModalsStore from "./store/ModalsStore";
import ImgStore from "./store/ImgStore";

const App = observer(() => {

        const columns: IColumn[] = [
            {
                field: 'id',
                name: "Id"
            },
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
                    UsersStore.setCurrentUser(row as IUserCreate)
                    ImgStore.setImgPhoto()
                    UsersStore.openEditForm()
                    ModalsStore.editModal.openForm()
                }
            },
            {
                icon: <i className="material-icons"> delete </i>,
                onClick: (row) => {
                    UsersStore.setCurrentUser(row as IUserCreate)
                    ModalsStore.deleteModal.openForm()
                }
            },

        ]

        return (
            <div className="App">
                <div className="container">
                    <h1>Table Users</h1>
                    <button className="btn col mx-1" onClick={() => ModalsStore.editModal.openForm()}>New User</button>
                    <FilterUser
                    />
                    <TableList
                        items={UsersStore.users}
                        columns={columns}
                        actions={actions}
                    />
                </div>
                <ModalWindow isOpen={ModalsStore.editModal.open} onClose={() => ModalsStore.editModal.close()}>
                    <FormInput/>
                </ModalWindow>
                <ModalWindow isOpen={ModalsStore.deleteModal.open} onClose={() => ModalsStore.deleteModal.close()}>
                    <DeleteEvent/>
                </ModalWindow>
            </div>
        );
    }
)

export default App;
