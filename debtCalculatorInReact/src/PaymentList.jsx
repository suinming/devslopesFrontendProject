import React from 'react';

class PaymentList extends React.Component{

   render(){
       const {payment} = this.props
       return(
           payment.map((obj,index) => {
             return(
             <div className="row" key={index}>
              <div className="item">Balance <br />
                <span>{obj.balance}</span>
              </div>
              <div className="item">Principle Payment <br />
                <span>{obj.principlePayment}</span>
              </div>
              <div className="item">New balance <br />
                <span>{obj.newBalance}</span>
              </div>
            </div>
              )
           })
       )
   }
}

export default PaymentList