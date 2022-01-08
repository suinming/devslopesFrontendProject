import React from 'react'
import './Confirm.css'
import PaymentInfo from '../PaymentInfo/PaymentInfo'
import Process from '../Process/Process'
import Summary from '../Summary/Summary'
import SignupLogin from '../SignupLogin/SignupLogin'

class Confirm extends React.Component{
    constructor(){
        super()
        this.state = {
            status:3,
            toPrevPage:false,
            toNextPage:false,
        }
    }

    handleBtnBack = () => {
        const toPrevPage = this.state.toPrevPage
        this.setState({
            toPrevPage : !toPrevPage
        })
    }

    handlePageFinished = () => {
       let {toNextPage} = this.state;
       
       this.setState({
            toNextPage:!toNextPage
       })
      
    }

    render(){
        const {toPrevPage, toNextPage, status} = this.state;
        const {itemData, userData, cardData, totalPrice, shippingMethod, discount} = this.props
        if(toPrevPage){
            return(<PaymentInfo
                    itemData = {itemData} 
                    userData = {userData}
                    totalPrice = {totalPrice}
                    discount = {discount}
            />
            )
        } else if(toNextPage){
            return(<SignupLogin/>)
        } else {
            return(
            <div className="container">
                    {/* left block*/}
                    <div className="confirmation">
                        {/* process flow chart*/}
                        <Process status = {this.state.status} key='process'/>
                        <h2 className='shippingInfoTitle'>Confirmation</h2>
                        {/* confirm information*/}
                        <div className='confirmationInfo'>
                            <div className="confirmationTitle">
                                Congratulation !!
                                <br />
                                Your Order Is Accepted
                            </div>
                            <div className="confirmationContent">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                <br />
                                Atque qui facilis, vel totam omnis deserunt maiores est 
                                <br />
                                voluptas voluptate blanditiis fuga sit mollitia necessitatibus
                                <br /> 
                                culpa sapiente, quaerat velit dolores error.
                            </div>
                        </div>
                        <button className='backBtn' onClick={this.handleBtnBack}>Back To PaymentInfo</button>
                    </div>
                    {/* right block*/}
                    <Summary
                    key='summary'
                    status = {status}
                    isPageFinished = {this.state.isPageFinished}
                    handlePageFinished={this.handlePageFinished}
                    itemData = {itemData} 
                    userData = {userData}
                    cardData = {cardData}
                    totalPrice = {totalPrice}
                    discount = {discount}
                    shippingMethod = {shippingMethod}
                    />
            </div>
            )
        }
    }
}

export default Confirm
