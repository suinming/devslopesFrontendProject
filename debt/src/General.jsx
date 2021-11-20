import React from 'react';
import PaymentList from './PaymentList';

class General extends React.Component{
   constructor(){
        super()
        this.state = {
          totalLoan:'',
          balance:'',
          interestRate:'',
          userPayment:'',
          payment:[],
         }
    }

   handleChange = (e) => { 
       this.setState({[e.target.name]: e.target.value})
    }

   handleNormalPayment = (e) => {
       e.preventDefault()
       const block = document.querySelector('.response-wrapper')
       const month = document.querySelector('.time')
       const minimalPayment = document.querySelector('.mini-payment-number')
       let totalLoan = Number(this.state.totalLoan)
       let interestRate = Number(this.state.interestRate) * 0.01
       let interest = totalLoan * interestRate / 12
       let principle = totalLoan * 0.01
       this.setState({
          balance:totalLoan
       })
       month.textContent = Math.ceil( totalLoan / (principle + interest) )
       block.style.display = 'block'
       minimalPayment.textContent = (principle + interest).toFixed(2)
   }

   handlePayment = (e) => {
      e.preventDefault()
      const minimalPayment = document.querySelector('.mini-payment-number')
      let userPayment = Number((this.state.userPayment))
      let balance = Number((this.state.balance))
      let interestRate = Number(this.state.interestRate) * 0.01
      let interest = Number((balance * interestRate / 12).toFixed(2))
      let principle = Number((balance * 0.01).toFixed(2))
      let principlePayment,newBalance,paymentArr = []
      
      if(userPayment < interest + principle){
         alert('payment should be more than interest plus principle payment!!')
         this.setState({
            userPayment:''
         })
      }else{
        principlePayment = Number((userPayment - interest).toFixed(2))
        newBalance = Number((balance - principlePayment).toFixed(2))
        interest = Number(((interestRate / 12) * newBalance).toFixed(2))
        principle = Number((newBalance * 0.01).toFixed(2))
        
        if(newBalance <= 0){
           newBalance = 0
           alert('You are debt free!!')
           minimalPayment.textContent = 0
        } else{
           minimalPayment.textContent = (interest + principle).toFixed(2)
        }
        paymentArr = [balance, principlePayment, newBalance]

        this.setState((state) => 
           ({payment: [...state.payment,paymentArr],
             balance: newBalance,
             userPayment:''
            }))

      }
   }

   reset = (e) =>{
      e.preventDefault()
      this.setState(
         {
           totalLoan:'',
          interestRate:'', 
         }
      )
      
   }

   render(){
      return(
      <div>
        {/* general info*/}
        <h1 className='title'>DEBT FREE CALCULATOR</h1>
        <form id='general-info' className='container' >
          <h2>General Info</h2>
          <div className="form-wrapper">
            <div className='form-group'>
              <input type="text" id='totalLoan' className="form__field" placeholder="Total Loan" name="totalLoan" 
              onChange={this.handleChange} value={this.state.totalLoan}
              required />
            </div>
            <div className='form-group'>
              <input type="text" id='interestRate' className="form__field" placeholder="Interest Rate(%)" name="interestRate" 
              onChange={this.handleChange} value={this.state.interestRate}
              required />
            </div>
            <div className="btn-wrapper">
              <button className='btn btn-primary' onClick={this.reset}>Reset</button>
              <button className='btn btn-primary' onClick={this.handleNormalPayment}>Submit</button>
            </div>
          </div>
          <div className="response-wrapper">
            It will take <span className='time'></span> months of normal payments to be debt free
          </div>
        </form>
        {/* make a payment*/}
        <form className='container' onSubmit={this.handlePayment}>
          <h2>Make a payment</h2>
          <div className='form-wrapper'>
            <div className='minimal-payment'>
              <span>Minimal payment</span>
              <br />
              <div className='to-right'>$<span className='mini-payment-number'></span> </div>
            </div>
            <input name='userPayment' type="text" className='form__field' placeholder='Payment' 
            onChange={this.handleChange} value={this.state.userPayment} required/>
            <div className="btn-wrapper">
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </form>
        <div className='container history'>
             <PaymentList paymentArr={this.state.payment}/>
        </div>
      </div>
      )
   }
}

export default General