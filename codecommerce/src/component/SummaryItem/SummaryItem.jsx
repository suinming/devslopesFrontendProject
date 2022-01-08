import React from 'react'
import './SummaryItem.css'

class SummaryItem extends React.Component{
    render(){
        const {product, index} = this.props
        return(
            <div className='summaryItem' key={'item-' + index}>
                <div className='imgWrapper'>
                    <img src={product.item.imgUrl} alt="" />
                </div>
                <div className="itemInfo">
                    <h6>{product.name}</h6>
                    <div> <span className='boldTitle'>COLOR :</span>{product.item.color}</div>
                    <div> <span className='boldTitle'>SIZE : </span>{product.item.size}</div>
                    <div> <span className='boldTitle'>QUANTITY : </span>{product.quantity}</div>
                    <div> <span className='boldTitle'>PRICE : </span>{product.price}</div>
                </div>
            </div>
        )
    }
}

export default SummaryItem