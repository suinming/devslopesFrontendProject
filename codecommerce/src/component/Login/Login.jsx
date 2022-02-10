import React from 'react'
import InputBase from '../InputBase/InputBase'
import './Login.css'
import { emailValidation, passwordValidation} from '../validation'
import { checkErrorBeforeSave } from '../../helper/checkErrorBeforeSave'

const INIT_USER_LOGIN = {
    email:'',
    password:'',
}



class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         userData:INIT_USER_LOGIN,
         isPasswordShown:false,
         error : {},
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
            default:
                break;
        }
    }

    handleBlur = ({target:{name,value}}) => this.handleValidation(name,value)

    handleSubmit = (e) => {
        const errorValue = checkErrorBeforeSave(this.state)

        if(Object.keys(errorValue).length === 0){
            this.setState({
                userData:INIT_USER_LOGIN,
            }, this.props.handleSubmit)
        } else{
            this.setState({ 'error': errorValue })
        }
    }

    render(){
        const loginData = [
            {label:'E-Mail', name:'email', type:'email', error:'emailError'},
            {label:'password', name:'password', type:'password', error:'passwordError'},
        ]
        
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                {loginData.map(item => (
                    <InputBase 
                        placeHolder={item.label}
                        type = {(item.type === 'password' || item.type === 'confirmPassword') ?
                        (this.state.isPasswordShown ?  'text' : 'password') : item.type
                        }
                        value = {loginData && loginData[item.name]}
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
                <InputBase name='login' type='submit' value='Login'></InputBase>
                <div className='btn-wrapper fbSignIn'>
                    <InputBase type="submit" value='Sign up with FACEBOOK' />
                </div>
            </form>
            </>
        )
    }
}

export default Login