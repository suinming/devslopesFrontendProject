import React from 'react'
import './InputBase.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


class InputBase extends React.Component{
    render(){
        return(
            <label>
            <input className='input-root' {...this.props} onClick={this.props.onClick}/>
            { (this.props.name === 'password' || this.props.name === 'confirmPassword') &&
                <FontAwesomeIcon 
                icon={faEye} 
                className='eyeIcon' 
                onClick = {this.props.passWordToggler} />
            }
            {this.props.errorM && <div className='errorInputBase'>{this.props.errorM}</div>}
            </label>
        )
    }
} 

export default InputBase