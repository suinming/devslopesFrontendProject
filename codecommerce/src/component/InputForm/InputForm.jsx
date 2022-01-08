import React from 'react'
import Select from '../Select/Select'
import './InputForm.css'

class InputForm extends React.Component{
    render(){
        if(this.props.format === 'base'){
           return(
            <div className='row'>
                <span>{this.props.title}</span>
                <div className='relativeForError'>
                    <input {...this.props}/> 
                    {this.props.errorM && <div className='error'>{this.props.errorM}</div>}
                </div>
            </div>
            ) 
        } else {
            return(
                (this.props.title.map((item,index) =>
                <Select 
                key={this.props.title[index].selectTitle}
                selectTitle={item.selectTitle} 
                option={item.option}
                onBlur = {this.props.onBlur}
                onChange = {this.props.onChange}
                errorM = {this.props.errorM}
                />)
                )
            )
        } 
    }
}

export default InputForm
