import React from 'react';

class PaymentList extends React.Component{

   render(){
       const {paymentArr} = this.props
       return(
           paymentArr.map((row,index) => {
             return(
             <div className="row" key={index}>
              <div className="item">Balance <br />
                <span>{row[0]}</span>
              </div>
              <div className="item">Principle Payment <br />
                <span>{row[1]}</span>
              </div>
              <div className="item">New balance <br />
                <span>{row[2]}</span>
              </div>
            </div>
              )
           })
       )
   }
}

export default PaymentList