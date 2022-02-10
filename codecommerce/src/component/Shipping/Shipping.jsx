import React from 'react'
import './Shipping.css'
import Cart from '../Cart/Cart'
import Process from '../Process/Process'
import InputForm from '../InputForm/InputForm'
import Summary from '../Summary/Summary'
import ShippingMethod from '../ShippingMethod/ShippingMethod'
import PaymentInfo from '../PaymentInfo/PaymentInfo'
import {onlyNumValidation, onlyStringValidation, checkNullValidation} from '../validation'

const SHIPPING = {
    addressTitle:'',
    nameSurname:'',
    yourAddress:'',
    zipCode:'',
    cellphone:'',
    telephone:'',
    country:'',
    city:'',
    state:''
}

class Shipping extends React.Component{
    constructor(props){
      super(props)
        this.state = {
            status:1,
            userData:SHIPPING,
            toPrevPage:false,
            toNextPage:false,
            isPageFinished:false,
            selectedOption:'standard',
            error:{},
        }
    }

    handleInputData = ({target:{name,value}}) =>{
        this.setState( prevState => ({
            userData : {...prevState.userData, [name] : value}
        }))
    }

    handleOptionChange = e => {
        let selectedOption = e.target.value
        this.setState({
            selectedOption: selectedOption,
        });
    };

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
            case 'nameSurname':
            case 'yourAddress':
            case 'addressTitle':
                errorText = onlyStringValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
            case 'cellphone':
                errorText = onlyNumValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
        
            case 'telephone':
                errorText = onlyNumValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;
            
            case 'zipCode':
                errorText = onlyNumValidation(value)
                this.setState( prevState => ({
                    error: {
                        ...prevState.error,
                        [name]:errorText,
                    }
                }))
                break;    
            case 'country':
            case 'city':
            case 'state':
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
        const {userData, error} = this.state
        let errorValue = {}
        let isError = false
        Object.keys(userData).forEach( val => {
            let errorKey = val + 'Error'
            if(!userData[val].length || error[errorKey]){ 
               if(!userData[val].length){
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
        const inputData = [
            {format:'base', title:'Address Title', type:'text', name:'addressTitle',error:'addressTitleError'},
            {format:'base', title:'Name-Surname', type:'text', name:'nameSurname',error:'nameSurnameError'},
            {format:'base', title:'Your Address', type:'text', name:'yourAddress',error:'yourAddressError'},
            {format:'base', title:'Zip Code', type:'text', name:'zipCode',error:'zipCodeError'},
            {format:'select',
             title:[{name:'country',selectTitle:'country',option:['us', 'uk']}, 
                    {name:'city',selectTitle:'city',option:['new york', 'london']},  
                    {name:'state',selectTitle:'state',option:['new york', 'london']}],  
             type: 'select',
             name:'select',
             error:['countryError', 'cityError', 'stateError']},
            {format:'base', title:'Cellphone', type:'text', name:'cellphone',error:'cellphoneError'},
            {format:'base', title:'Telephone', type:'text', name:'telephone',error:'telephoneError'},
        ]
        const shippingMethodOption = [
            {type:'radio', value:'standard', info:'Standard Delivery in 4-6 business Days - Free '},
            {type:'radio', value:'express', info:'Express - Delivery in 2-3 business Days - $ 5.00'},
        ]
        const {homepageData, itemData, totalPrice, discount} = this.props

            if(this.state.toPrevPage){
                return(<Cart itemData = {homepageData}/>)
            } else if(this.state.toNextPage){
                return(<PaymentInfo
                        userData = {this.state.userData}
                        shippingMethod = {this.state.selectedOption}
                        itemData = {itemData} 
                        totalPrice = {totalPrice}
                        discount = {discount}
                        />)
            } else{
                return(
                <div className="container">
                    {/* left block*/}
                    <div className="shippingForm">
                        {/* process flow chart*/}
                        <Process status = {this.state.status} key='process'/>
                        <h2 className='shippingInfoTitle'>Shipping Information</h2>
                            {/* form input*/}
                            {inputData.map(item => 
                                <InputForm
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
                            {/* shipping method*/}
                            <h2 className='shippingMethod'>Shipping Method</h2>
                            {shippingMethodOption.map(item => 
                                <ShippingMethod
                                key={item.value}
                                type={item.type}
                                value={item.value}
                                info={item.info}
                                onClick={this.handleOptionChange}
                                selectedOption={this.state.selectedOption}
                                />
                            )}
                            <button className='backBtn' onClick={this.handleBtnBack}>Back To Cart</button>
                    </div>
                    {/* right block*/}
                    <Summary
                    key='summary'
                    itemData = {itemData} 
                    totalPrice = {totalPrice}
                    discount = {discount}
                    userData = {this.state.userData}
                    shippingMethod = {this.state.shippingMethod}
                    status = {this.state.status}
                    isPageFinished = {this.state.isPageFinished}
                    handlePageFinished={this.handlePageFinished}
                    />
                </div> 
                )
            }
        }
}

export default Shipping