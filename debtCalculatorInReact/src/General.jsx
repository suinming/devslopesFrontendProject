import React from 'react';
import PaymentList from './PaymentList';

class General extends React.Component{
   constructor(){
        super()
        this.state = {
          totalLoan:'',
          interestRate:'',
          month:'',
          minimalPayment:'',
          balance:'',
          userPayment:'',
          payment:[],
         }
    }

   handleChange = (e) => { 
       this.setState({[e.target.name]: e.target.value})
    }

   handleNormalPayment = (e) => {
       e.preventDefault()
       let totalLoan = Number(this.state.totalLoan)
       let interestRate = Number(this.state.interestRate) * 0.01
       let interest = totalLoan * interestRate / 12
       let principle = totalLoan * 0.01
       this.setState({
          month:Math.ceil( totalLoan / (principle + interest) ),
          minimalPayment:(principle + interest).toFixed(2),
          balance:totalLoan
       })
   }

   handlePayment = (e) => {
      e.preventDefault()
      let userPayment = Number((this.state.userPayment))
      let balance = Number((this.state.balance))
      let interestRate = Number(this.state.interestRate) * 0.01
      let interest = Number((balance * interestRate / 12).toFixed(2))
      let principle = Number((balance * 0.01).toFixed(2))
      let principlePayment,newBalance 
      
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
           this.setState({minimalPayment : 0})
        } else{
          this.setState({minimalPayment : (interest + principle).toFixed(2)})
        }

         this.setState({
           payment:
            [...this.state.payment,
            {balance:balance,principlePayment:principlePayment,newBalance:newBalance}
            ],
           userPayment:'',
           balance:newBalance,
          })
      }
   }

   reset = (e) =>{
      e.preventDefault()
      this.setState(
         {
           totalLoan:'',
           interestRate:'', 
           month:''
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
          {this.state.month ?
          <div className="response-wrapper">
            It will take <span className='time'>{this.state.month}</span> months of normal payments to be debt free
          </div>
          : null
          }
          
        </form>
        {/* make a payment*/}
        <form className='container' onSubmit={this.handlePayment}>
          <h2>Make a payment</h2>
          <div className='form-wrapper'>
            <div className='minimal-payment'>
              <span>Minimal payment</span>
              <br />
              <div className='to-right'>$
              <span className='mini-payment-number'>{
                this.state.minimalPayment ? this.state.minimalPayment:
                null
              }</span> 
              </div>
            </div>
            <input name='userPayment' type="text" className='form__field' placeholder='Payment' 
            onChange={this.handleChange} value={this.state.userPayment} required/>
            <div className="btn-wrapper">
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </form>
        <div className='container history'>
             <PaymentList payment={this.state.payment}/>
        </div>
      </div>
      )
   }
}

export default General