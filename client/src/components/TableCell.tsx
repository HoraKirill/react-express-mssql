import React from 'react';
import {IColumn, ILabelMapping} from "./TableList";

export enum ECellType {
    image,
    boolean,
}

interface TableProps<T> {
    data: T;
    column: IColumn;
    isHead: boolean;
}

export default function TableCell<T>({data, column, isHead}: TableProps<T>) {

    const renderCell = () => {
        switch (column.cellType) {
            case ECellType.boolean:
                const labels = column.labelsMapping
                return <td>{labels?.[data as unknown as keyof ILabelMapping] ?? (data ? 'Да' : 'Нет')}</td>
            case ECellType.image:
                return <td><img src={"http://localhost:3001/" + data} className="img" alt=""/></td>
            default:
                return <td>{data}</td>
        }
    }


    return (
        <>
            {isHead ? <th>{data}</th> : renderCell()}
        </>

    );
};