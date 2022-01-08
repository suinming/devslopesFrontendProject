import React from 'react'
import './Select.css'

class Select extends React.Component{
    render(){
        const {selectTitle, onChange, onBlur, errorM, option} = this.props
        return(
            <div className='row'>
              <span className='inlineSpan'>{selectTitle}</span>
              <select name={selectTitle} onChange = {onChange} onBlur = {onBlur}>
                <option key={'null'}></option>
                {option.map(option => {
                    return(<option key={option} value={option} >{option}</option>)
                })}
              </select>  
              {errorM && <div className='errorSelect'>{errorM}</div>}
            </div>
        )
    }
}

export default Select