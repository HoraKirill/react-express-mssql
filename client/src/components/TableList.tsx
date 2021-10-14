import React from 'react';
import TableRow, {ERowType, IActions} from "./TableRow";
import {ECellType} from "./TableCell";
import {observer} from "mobx-react";
import UsersTable from "../store/UsersStore";


export interface IColumn {
    field: string;
    name: string;
    cellType?: ECellType;
    labelsMapping?: ILabelMapping
}

export interface ILabelMapping {
    true: string;
    false: string;
}

interface TableProps<T> {
    items: T[]
    columns: IColumn[];
    actions?: IActions<T>[]
}

UsersTable.fetchData()


export default observer(function TableList<T extends { id?: number | null }>({items, columns, actions}: TableProps<T>) {

    return (
            <table className="highlight pt-1">
                <thead>
                <TableRow columns={columns} item={columns} rowType={ERowType.head}/>
                </thead>
                <tbody>
                {
                    items?.length ?
                        items.map(item => <TableRow actions={actions} columns={columns} item={item} key={item.id}/>) :
                        <tr>
                            <th><h2>Нет данных</h2></th>
                        </tr>
                }
                </tbody>
            </table>
        );
    }
)

