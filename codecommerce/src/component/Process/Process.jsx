import React from 'react'
import './Process.css'

class Process extends React.Component{
    render(){
        switch (this.props.status) {
            case 1:
                return(
                    <div className='flowChart'>
                        {/* status-1*/}
                        <div className='circle'>Cart</div>
                        <div className="line"></div>
                        <div className='circle'>Delivery</div>
                        {/* status-2*/}
                        <div className="lineGray"></div>
                        <div className='circleGray'>Payment</div>
                        {/* status-3*/}
                        <div className="lineGray"></div>
                        <div className='circleGray'>Confirmation</div>
                    </div>
                )
                
            case 2:
                return(
                    <div className='flowChart'>
                        {/* status-1*/}
                        <div className='circle'>Cart</div>
                        <div className="line"></div>
                        <div className='circle'>Delivery</div>
                        {/* status-2*/}
                        <div className="line"></div>
                        <div className='circle'>Payment</div>
                        {/* status-3*/}
                        <div className="lineGray"></div>
                        <div className='circleGray'>Confirmation</div>
                    </div>
                )
            case 3:
                return(
                    <div className='flowChart'>
                        {/* status-1*/}
                        <div className='circle'>Cart</div>
                        <div className="line"></div>
                        <div className='circle'>Delivery</div>
                        {/* status-2*/}
                        <div className="line"></div>
                        <div className='circle'>Payment</div>
                        {/* status-3*/}
                        <div className="line"></div>
                        <div className='circle'>Confirmation</div>
                    </div>
                )
            default:
                break;
        }  
    }
}

export default Process