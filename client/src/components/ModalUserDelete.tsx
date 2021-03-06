import React from 'react';
import UsersTable from "../store/UsersStore";
import {observer} from "mobx-react";
import ModalsStore from "../store/ModalsStore";

const ModalUserDelete: React.FC = observer(() => {
    return (
        <div>
            <h4 className="center">Вы точно хотите удалить ?</h4>
            <div className="input-field center ">
                <button onClick={() => ModalsStore.deleteModal.formClose()} className="btn waves-effect waves-light mx-1">Нет</button>
                <button
                    onClick={() => {
                        UsersTable.userDelete()
                        ModalsStore.deleteModal.formClose()
                     }
                    }
                    className="btn waves-effect waves-light mx-1">Да
                </button>
            </div>
        </div>
    );
})


export default ModalUserDelete;