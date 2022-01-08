import React from 'react'
import './ShippingMethod.css'

class ShippingMethod extends React.Component{
    render(){
        const {type, value, onClick, selectedOption, info} = this.props
        return(
            <div>
                <input 
                type={type} 
                value={value} 
                className='radioOption' 
                onClick={onClick}
                checked={selectedOption === value}
                />
                <span className='radioText'>{info}</span>
            </div>
        )
    }
}

export default ShippingMethod
