import React, { Component } from 'react';
import './StatusElement.css'

class StatusElement extends Component {
    render() {
        const {item} = this.props
        const img = `/img/${item.categories}/${item.name}.jpg`
        return (
            <div key={item.name} className='itemWrapper'>
                    <div className="StatusleftSection">
                        <img src={img} alt="product" />
                    </div>
                    <div className="StatusrightSection">
                        <div className="name">
                            <span className='value'>{item.name}</span>
                        </div>
                        <div className="price">
                            <span className='title'>Price</span>
                            <span className='value'>{item.price}</span>
                        </div>
                        <div className="inventory">
                            <span className='title'>Inventory</span>
                            <span className='value'>{item.inventory}</span>
                        </div>
                    </div>
            </div>
        );
    }
}

export default StatusElement;