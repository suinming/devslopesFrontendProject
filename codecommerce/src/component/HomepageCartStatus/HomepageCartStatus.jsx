import React, { Component } from 'react';
import './HomepageCartStatus.css'
import StatusElement from '../StatusElement/StatusElement';

class HomepageCartStatus extends Component {
    render() {
        const {data, handlePageFinished} = this.props
        
        return (
            <div className='cartStatus'>
                <h3>YOUR CART : {data.length} </h3>
                {data.map(item => (
                    <StatusElement item = {item}/>
                ))}
                <div className='goToCart' onClick={handlePageFinished}>GO TO CART</div>
            </div>
        );
    }
}

export default HomepageCartStatus;