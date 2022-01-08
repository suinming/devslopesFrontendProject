import React from 'react'
import './PaymentInfo.css'
import Shipping from '../Shipping/Shipping'
import Summary from '../Summary/Summary'
import InputForm from '../InputForm/InputForm'
import Process from '../Process/Process'
import Confirm from '../Confirm/Confirm'
import { OTHERCARDS } from '../InputForm/constants'
import {onlyNumValidation, cardNumberValidation, onlyStringValidation, checkNullValidation} from '../validation'

const INIT_CARD = {
    cardNumber:'',
    cardHolderName:'',
    expireMonth:'',
    expireYear:'',
    ccv:'',
}

class PaymentInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            status:2,
            toPrevPage:false,
            toNextPage:false,
            isPageFinished:false,
            cardData:INIT_CARD,
            maxLength:OTHERCARDS.length,
            error:{},
        }
    }

    numberSeq = (start,end) => {
    let seqArr = [];
    let num = end - start + 1;
    seqArr = 
        Array(num)
        .fill()
        .map((element, index) => index + start)
    return seqArr
    }

    handleInputData = ({target:{name,value}}) =>{
        if(name === 'cardNumber'){
            let mask = value.split(' ').join('')
            if(mask.length){
                mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ')
                 this.setState( prevState => ({
                 cardData : {...prevState.cardData, [name] : mask}
             }))
            } else{
                this.setState( prevState => ({
                cardData : {...prevState.cardData, [name] : value}
            }))
            }
        } else{
            this.setState( prevState => ({
            cardData : {...prevState.cardData, [name] : value}
        }))
        }
    }

    handleBtnBack = () => {
        const toPrevPage = this.state.toPrevPage
        this.setState({
            toPrevPage : !toPrevPage
        })
    }

    handleValidation = (type, value) =>{
        let errorText
        let name = type + 'Error'
        switch (type) {
            case 'cardNumber':
                errorText = cardNumberValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
            case 'cardHolderName':
                errorText = onlyStringValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
        
            case 'ccv':
                errorText = onlyNumValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
            
            case 'expireMonth':
            case 'expireYear':
                errorText = checkNullValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;

            default:
                break;
        }
    }

    handleBlur = ({target:{name,value}}) => this.handleValidation(name,value)

    checkErrorBeforeSave = () => {
        const {cardData, error} = this.state
        let errorValue = {}
        let isError = false
        Object.keys(cardData).forEach( val => {
            let errorKey = val + 'Error'
            if(!cardData[val].length || error[errorKey]){ 
               if(!cardData[val].length){
                    errorValue = {...errorValue,[`${val}Error`]:'Required'}    
                } else{
                    errorValue = {...errorValue,[`${val}Error`]:error[`${val}Error`]}  
               }
              isError = true
            }
        })
        
        this.setState({'error':errorValue}) 
        return isError
    }

    handlePageFinished = () => {
       let isError = this.checkErrorBeforeSave();
       let {isPageFinished,toNextPage} = this.state;
       if(!isError){
            this.setState({
                isPageFinished:!isPageFinished,
                toNextPage:!toNextPage
            })
       }
    }

    render(){
        const {maxLength} = this.state
        const {itemData, totalPrice, discount, userData, shippingMethod} = this.props
        const inputData = [
            {format:'base', title:'CardHolder Name', type:'text', name:'cardHolderName',error:'cardHolderNameError'},
            {format:'base', title:'Card Number', type:'text', name:'cardNumber',error:'cardNumberError'},
            {format:'select',
             title:[{name:'expireMonth',selectTitle:'expireMonth',option:this.numberSeq(1, 12)}, 
                    {name:'expireYear',selectTitle:'expireYear',option:this.numberSeq(2010,2030)},  
                    ],  
             type: 'select',
             name:'select',
             error:['expireMonthError', 'expireYearError']},
            {format:'base', title:'CCV', type:'text', name:'ccv',error:'ccvError'},
        ]
        if(this.state.toPrevPage){
            return (<Shipping
                    itemData = {itemData} 
                    totalPrice = {totalPrice}
                    discount = {discount}
                    />)
        } else if(this.state.toNextPage){
            return (<Confirm
                    cardData = {this.state.cardData}
                    userData = {userData}
                    shippingMethod = {shippingMethod}
                    itemData = {itemData} 
                    totalPrice = {totalPrice}
                    discount = {discount}
            />
            )
        } else{
            return(
                <div className="container">
                    {/* left block*/}
                    <div className="paymentForm">
                        {/* process flow chart*/}
                        <Process status = {this.state.status} key='process'/>
                        <h2 className='shippingInfoTitle'>Payment Information</h2>
                            {/* form input*/}
                            {inputData.map(item => 
                                <InputForm
                                value = {this.state.cardData && this.state.cardData[item.name]}
                                maxLength = {maxLength}
                                key={item.name}
                                format={item.format} 
                                title={item.title}
                                type={item.type}
                                name={item.name}
                                onChange = {this.handleInputData}
                                onBlur = {this.handleBlur}
                                autoComplete = 'off'
                                errorM = {
                                (this.state.error 
                                && this.state.error[item.error]
                                && this.state.error[item.error].length > 1)
                                ? this.state.error[item.error]
                                : null
                                }
                                />    
                            )}
                            <button className='backBtn' onClick={this.handleBtnBack}>Back To Shipping</button>
                    </div>
                    {/* right block*/}
                    <Summary
                    key='summary'
                    status = {this.state.status}
                    isPageFinished = {this.state.isPageFinished}
                    handlePageFinished={this.handlePageFinished}
                    itemData = {itemData} 
                    totalPrice = {totalPrice}
                    discount = {discount}
                    userData = {userData}
                    shippingMethod = {shippingMethod}
                    />
                </div>
            )
        }
    }
}

export default PaymentInfo