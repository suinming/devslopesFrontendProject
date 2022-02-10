import React, { Component } from 'react';
import './HomepageItem.css'
import Popup from '../Popup/Popup';

class HomepageItem extends Component {

    constructor(props){
        super(props)
        this.state = {
            popup:false,
        }
    }

    render() {
        const {itemInfo, index} = this.props
        const img = `/img/${itemInfo.categories}/${itemInfo.name}.jpg`

        return (
            <div className='card' data-index={index} onClick={this.props.popupClick}>
                <div className="imgWrapper">
                    <img src={img} alt="product" />
                </div>
                <div className='name'>
                    <span className='subTitle'>Name : </span>
                    <span>{itemInfo.name}</span>
                </div>
                <div className='categories'>
                    <span className='subTitle'>Categories : </span>
                    <span>{itemInfo.categories}</span>
                </div>
                <div className='inventory'>
                    <span className='subTitle'>Inventory : </span>
                    <span>{itemInfo.inventory}</span>
                </div>
                <div className='price'>
                    <span className='subTitle'>Price : </span>
                    <span>{itemInfo.price}</span>
                </div>
            </div>
        );
    }
}

export default HomepageItem;