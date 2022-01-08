import React from 'react'
import './Signup.css'
import InputBase from '../InputBase/InputBase'
import { emailValidation, passwordValidation, onlyStringValidation, samePassword, postcodeValidation} from '../validation'

const INIT_USER_CREATEACCOUNT = {
    email:'',
    password:'',
    confirmPassword:'',
    firstName:'',
    surName:'',
    postcode:'',
}

class Signup extends React.Component{
    constructor(){
        super()
        this.state ={
            isPasswordShown: false,
            userData:INIT_USER_CREATEACCOUNT,
            error:{},
        }
    }

    togglePasswordVisibility = () =>{
        this.setState({
            isPasswordShown: !this.state.isPasswordShown,
        })
    }

    handleInputData = ({target:{name,value}}) =>{
        this.setState( prevState => ({
            userData : {...prevState.userData, [name] : value}
        }))
    }

    handleValidation = (type, value) =>{
        let errorText
        switch (type) {
            case 'email':
                errorText = emailValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        emailError:errorText,
                    }
                }))
                
                break;
            case 'password':
                errorText = passwordValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        passwordError:errorText,
                    }
                }))
                break;
            case 'confirmPassword':
                errorText = samePassword(this.state.userData.password,value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        confirmPasswordError:errorText,
                    }
                }))
                break;
            case 'firstName':
                errorText = onlyStringValidation(value)
                // setState error
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        firstNameError:errorText,
                    }
                }))
                break;
            case 'surName':
                errorText = onlyStringValidation(value)
                // setState error
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        surNameError:errorText,
                    }
                }))
                break;
            case 'postcode':
                errorText = postcodeValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        postcodeError:errorText,
                    }
                }))
                break;
            default:
                break;
        }
    }

    handleBlur = ({target:{name,value}}) => this.handleValidation(name,value)

    checkErrorBeforeSave = () => {
        const {userData, error} = this.state
        let errorValue = {}
        let isError = false
        Object.keys(userData).forEach( val => {
            let errorKey = val + 'Error'
            if(!userData[val].length || error[errorKey]){ 
               if(!userData[val].length){
                    errorValue = {...errorValue,[`${val}Error`]:'Required'}    
                } else{
                    errorValue = {...errorValue,[`${val}Error`]:error[`${val}Error`]}  
               }
              isError = true
            }
        })
        
        this.setState({'error':errorValue}) 
        return isError
    }

    handleSubmit = (e) => {
        const isError = this.checkErrorBeforeSave()
        if(!isError){
            this.setState({
                userData:INIT_USER_CREATEACCOUNT,
                toNextPage : true,
            }, () => this.props.handleSubmit)   
        }
    }

    render(){
        const createAccountData = [
                {label:'E-Mail', name:'email', type:'email', error:'emailError'},
                {label:'password', name:'password', type:'password', error:'passwordError'},
                {label:'confirm password', name:'confirmPassword', type:'password', error:'confirmPasswordError'},
                {label:'first name', name:'firstName', type:'text', error:'firstNameError'},
                {label:'surname', name:'surName', type:'text', error:'surNameError'},
                {label:'postcode', name:'postcode', type:'text', error:'postcodeError'},
            ]
        return(
            <div>
                {createAccountData.map(item => (
                    <InputBase 
                        placeHolder={item.label}
                        type = {(item.type === 'password' || item.type === 'confirmPassword') ?
                        (this.state.isPasswordShown ?  'text' : 'password') : item.type
                        }
                        value = {createAccountData && createAccountData[item.name]}
                        onChange = {this.handleInputData}
                        onBlur = {this.handleBlur}
                        autoComplete = 'off'
                        name = {item.name}
                        passWordToggler = {this.togglePasswordVisibility}
                        errorM = {
                            (this.state.error 
                            && this.state.error[item.error]
                            && this.state.error[item.error].length > 1)
                            ? this.state.error[item.error]
                            : null
                        }
                    />
                    ))
                }
                {/* submit button*/}
                <InputBase name='submit' type='submit' value='Submit' onClick={this.handleSubmit}></InputBase>
                <div className='btn-wrapper fbSignIn'>
                    <InputBase type="submit" value='Sign up with FACEBOOK' />
                </div>
            </div>
        )
    }
}

export default Signup