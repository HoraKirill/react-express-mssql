import {action, makeAutoObservable} from "mobx";

interface IValidators {
    minLength?: number;
    required?: boolean
    isEmail?: boolean
    isPhone?: boolean
    isDate?: boolean
}

interface IValidation {
    isDirty: boolean;
    value: string ;
    validators?: IValidators
    errorType: string | boolean
    inputValid: boolean
}

export default class ValidationForm implements IValidation {
    required: string |boolean = true;
    minLength: string |boolean = false;
    isEmail: string |boolean = false;
    isPhone: string |boolean = false
    isDate : string |boolean = false
    isDirty = false;
    value = ''
    validators?: IValidators
    errorType:string | boolean = false
    inputValid = false

    constructor(validators: IValidators) {
        makeAutoObservable(this, {
            onBlur: action.bound,
            useValidation: action.bound
        })
        this.validators = validators
    }

    useValidation() {
        this.isDirty = true
        for (const validation in this.validators) {
            switch (validation) {
                case 'required' :
                    this.required = !this.value ? this.errorType = `Имя должно содержать символы` : this.errorType = false
                    break;
                case 'minLength':
                    this.minLength = this.value.length < this.validators?.[validation]!
                        ? this.errorType = `Имя не может быть меньше ${this.validators?.[validation]} символов`
                        : this.errorType = false
                    break;
                case 'isEmail' :
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    this.isEmail = !re.test(String(this.value).toLowerCase())
                        ? this.errorType = `Email должен быть введен типа test@test.com`
                        : this.errorType = false
                    break;
                case 'isPhone' :
                    const rex = /^((\+7|7|8)+([0-9]){10})$/;
                    this.isPhone = !rex.test(String(this.value).toLowerCase())
                        ? this.errorType = `Телефон должен быть введен формата 89283217740`
                        : this.errorType = false
                    break;
                case 'isDate' :
                    const red = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;
                    this.isDate = !red.test(this.value)
                        ? this.errorType = `День рождения должен быть заполнен`
                        : this.errorType = false
            }
        }
        if (this.errorType) {
            this.inputValid = false
        } else {
            this.inputValid = true
        }
    }

    onBlur() {
        this.isDirty = true
        this.useValidation()
    }
}

