import React from 'react'
import './SignupLogin.css'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Homepage from '../Homepage/Homepage'

class SignupLogin extends React.Component{
    constructor(){
        super()
        this.state = {
            selectedOption:'login',
            toNextPage:false,
        }
    }

    handleOptionChange = e => {
        this.setState({
            selectedOption: e.target.value,
        })   
    };

    switchToNextPage = () => {
        let toNextPage = this.state.toNextPage;
        this.setState({
            toNextPage: !toNextPage
        })
    }

    handleSubmit = (e) => {
        let toNextPage = this.state.toNextPage;
        this.setState({
            toNextPage: !toNextPage
        })
    }

    render(){
        const {selectedOption, toNextPage} = this.state

        return(
            (toNextPage ? 
            <Homepage />:
            <div className='wrapper'>
                 
                    <div className='formSelection' >
                        <label>
                        <input
                            type="radio"
                            name="login"
                            value="login"
                            checked={selectedOption === "login"}
                            onChange={this.handleOptionChange}
                        />
                            Login
                        </label>
                       <label>
                        <input
                            type="radio"
                            name="createAccount"
                            value="createAccount"
                            checked={selectedOption === "createAccount"}
                            onChange={this.handleOptionChange}
                        />
                            Create Account
                        </label>
                    </div>
                    {/* display login or sign up content*/}
                    {selectedOption === 'login' ? 
                        <Login handleSubmit = {this.handleSubmit}/> : 
                        <Signup handleSubmit = {this.handleSubmit}/>
                    }
                
            </div>
             )
        )
    }
}

export default SignupLogin