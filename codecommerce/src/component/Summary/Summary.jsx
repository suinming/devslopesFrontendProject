import React from 'react'
import SummaryItem from '../SummaryItem/SummaryItem';
import './Summary.css'

class Summary extends React.Component{

   cardNumDisplay = (cardNum) => {
    let display, cardNumLength = cardNum.length

    display = [...cardNum]
    .map( (digit, index) => {
        if(digit !== ' ' && index <  cardNumLength - 4 ){
        digit = '*';
        }
        return digit;
    }).join(''); 

    return display;     
}

    render(){
        const {totalPrice, discount, itemData, userData, cardData, status,  
            shippingMethod, handlePageFinished} = this.props
        const summaryData = [
            {status:0, title:'Car Subtotal', price:totalPrice},
            {status:0, title:'Discount', price:discount},
            {status:0, title:'Cart Total', price:totalPrice - discount},
        ]
        const payNum = 'PAY $ ' + (totalPrice - discount) ;
        return(
            <div className="summary">
                    <h5>SUMMARY</h5>
                    {/* price*/}
                    {summaryData
                        .map(item => {
                            return(
                                    <div key={item.title} className='summaryPrice'>
                                        <div className='subtitle'>{item.title}</div>
                                        <div className='price'>${item.price}</div>
                                    </div>
                                )
                            })
                    } 
                    {/* item*/}
                    {status >= 1 && itemData &&
                        <div className='summaryItemWrapper'>
                            {itemData.map( (product, index) => 
                                <SummaryItem product = {product} index = {index}/>)
                            }
                        </div>
                    }
                    {/* user information*/}
                    { status >= 2 && userData &&  
                        <div className='itemInfo'> 
                            <div className='subtitle'>Shipping Information</div>
                            <span className='boldTitle'>NAME : </span>{userData.nameSurname}
                            <br />
                            <span className='boldTitle'>ADDRESS : </span>
                                <br />
                                {userData.zipCode}
                                <br />
                                {userData.yourAddress} 
                                {userData.addressTitle} 
                                <br />
                                {userData.city} 
                                {userData.state} 
                                {userData.country}
                            <br />
                            <span className='boldTitle'>CELLPHONE : </span>
                                {userData.cellphone}
                            <br />
                        </div>
                    }  
                    {/* shipping method*/}      
                    {shippingMethod &&
                        <div className="itemInfo">
                            <div className='subtitle'>Shipping Method</div>
                            {shippingMethod.toUpperCase()}
                        </div>
                    }
                    {/* card information*/}
                    {cardData &&
                        <div className='itemInfo'>
                            <div className="subtitle">Card Information</div>
                            <span className='boldTitle'>CARDHOLDER NAME : </span>
                            {this.props.cardData.cardHolderName}
                            <br />
                            <span className='boldTitle'>CARD NUMBER : </span>
                            <br />
                            {this.cardNumDisplay(this.props.cardData.cardNumber)}
                            <br />
                            <span className='boldTitle'>EXPIRE DATE : </span>
                            {this.props.cardData.expireMonth} 
                            {'/'}
                            {this.props.cardData.expireYear}
                            <br />
                        </div>
                    }
                    {/* submit button*/}
                    {status === 2 ? 
                    <button className='checkoutBtn' value='pay' onClick={handlePageFinished}>
                        {payNum}
                    </button>
                    : 
                    <button className='checkoutBtn' value='checkout' onClick={handlePageFinished}>
                        CHECKOUT
                    </button>
                    }        
                    
            </div>
        )
    }
}

export default Summary