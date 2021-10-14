import React from 'react';
import FilterStore, {EAgeType, ESuperType} from "../store/FilterStore";
import {observer} from "mobx-react";

const FilterUser: React.FC = observer(() => {

    return (
        <div className="row">
            <input
                value={FilterStore.filterParameters.query}
                onChange={event => FilterStore.changingLine(event.target.value)}
                className="col s6"
                type="text"
                placeholder={'Search'}
                style={{marginBottom: 0}}
            />
            <div className="input-field col s2 ">
                <select
                    style={{display: "inline-block"}}
                    value={FilterStore.filterParameters.queryType}
                    onChange={event => FilterStore.changingType(event.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="id">Id</option>
                </select>
            </div>
            <div className="input-field col s2 ">
                <select
                    style={{display: "inline-block"}}
                    value={FilterStore.filterParameters.age}
                    onChange={event => FilterStore.changingDate(event.target.value as EAgeType)}
                >
                    <option value={''}>All age</option>
                    <option value={EAgeType.adult}>18+</option>
                    <option value={EAgeType.child}>18-</option>
                </select>
            </div>
            <div className="input-field col s2 ">
                <select
                    style={{display: "inline-block"}}
                    value={FilterStore.filterParameters.superUser}
                    onChange={event => FilterStore.changingSuperuser(event.target.value as ESuperType)}
                >
                    <option value={''}>All Users</option>
                    <option value={ESuperType.admin}>Admin</option>
                    <option value={ESuperType.user}>No Admin</option>
                </select>
            </div>
        </div>
    );
})

export default FilterUser;