import React, {ReactElement} from 'react';
import TableCell from "./TableCell";
import {IColumn} from "./TableList";
import '../index.css';

export enum ERowType {
    head,
}

interface ITableItemProps<T> {
    item: T
    columns: IColumn[]
    rowType?: ERowType
    actions?: IActions<T>[]
}

export interface IActions<T> {
    icon: ReactElement<"i">;
    onClick: (row: T) => void;
}

export default function TableRow<T>({item, columns, rowType, actions}: ITableItemProps<T>) {
    return (
        <tr>
            {columns.map((column) =>
                <TableCell
                    data={ERowType.head === rowType ? column.name : item[column.field as keyof T]}
                    column={column}
                    isHead={ERowType.head === rowType}
                    key={column.field}
                />
            )}
            {ERowType.head === rowType ?
                <th>Действия</th>
                :
                <td>
                    {actions?.length && actions.map((action) => {
                      return  <button className="mx-1" onClick={() => action.onClick(item)} key={Math.random()}>{action.icon}</button>
                })}
                </td>
            }
        </tr>
    );
};

