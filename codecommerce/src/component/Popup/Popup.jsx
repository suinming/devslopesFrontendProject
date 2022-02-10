import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Popup.css'

class Popup extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    removeHTMLtag = str => str.replace( /(<([^>]+)>)/ig, '')

    render() {
        const {data, popupClose, addToCart, index} = this.props
        const img = `/img/${data.categories}/${data.name}.jpg`

        //remove the HTML tag in description
        data.description = this.removeHTMLtag(data.description)
        
        return (
            <div className='popup'>
                <FontAwesomeIcon icon={faTimes} className='timesIcon' onClick={popupClose} />

                <div className="leftSection">
                    <img src={img} alt="product" />
                </div>

                <div className="rightSection">
                    <div className="name">
                        <span className='value'>{data.name}</span>
                    </div>
                    <div className="price">
                        <span className='title'>Price</span>
                        <span className='value'>{data.price}</span>
                    </div>
                    <div className="inventory">
                        <span className='title'>Inventory</span>
                        <span className='value'>{data.inventory}</span>
                    </div>
                    <div className="categories">
                        <span className='title'>Categories</span>
                        <span className='value'>{data.categories}</span>
                    </div>
                    <div className="description">
                        <span className='title'>Description</span>
                        <p className='value'>{data.description}</p>
                    </div>
                    <div className="addToCartBtn" onClick={addToCart} data-index = {index}>Add To Cart</div>
                </div>
            </div>
        );
    }
}

export default Popup;