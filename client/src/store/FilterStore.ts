import {makeAutoObservable} from "mobx";
import axios from "axios";
import UsersStore from "./UsersStore";
import {User} from "../models/User";

export enum EAgeType {
    adult = 'adult',
    child = 'child',
}

export enum ESuperType {
    admin = 'admin',
    user = 'user',
}

interface IFilterParam {
    query?: string;
    queryType?: string;
    superUser?: ESuperType;
    age?: EAgeType;
}

export interface IFilterStore {
    filterParameters: IFilterParam
}

class FilterStore implements IFilterStore {
    filterParameters: IFilterParam = {
        query: '',
        queryType: 'name',
        superUser: undefined,
        age: undefined
    }

    requestFilter:IFilterParam = {
        queryType: 'name',
    }

    constructor() {
        makeAutoObservable(this)
    }

    async getFilteredUsers() {
        const res = await axios.post(`http://localhost:3001/users`, this.requestFilter)
        UsersStore.filterUsers(res.data as unknown as User[])
    }

     changingLine(e: string) {
        this.filterParameters.query = e
         this.requestFilter.query = e
         this.getFilteredUsers()
    }

     changingType(e: string) {
        this.filterParameters.queryType = e
         this.requestFilter.queryType = e
     }

     changingSuperuser(e: ESuperType) {
        this.filterParameters.superUser = e
         this.requestFilter.superUser = e
         this.getFilteredUsers()
     }

    changingDate(e: EAgeType | undefined) {
        this.filterParameters.age = e
        this.requestFilter.age = e
        this.getFilteredUsers()
    }

}

export default new FilterStore();