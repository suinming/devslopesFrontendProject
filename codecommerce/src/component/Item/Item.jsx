import React from 'react'
import './Item.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class Item extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            quantity:null,
            totalPrice:null,
            itemDisplay:true,
        }
    }

    handleItemDelete = () =>{
        let itemDisplay = this.state.itemDisplay
        this.setState({
            itemDisplay:!itemDisplay
        },() => {this.props.pushElementToArr(0,this.props.index)} )
    }

    handleSelect = e =>{
        this.setState({ 
            quantity: Number(e.target.value),
            totalPrice: (Number(e.target.value) * this.props.itemInfo.price).toFixed(2)
        }, () => {this.props.pushElementToArr(this.state.totalPrice,this.state.quantity,this.props.index)});
    }

    render(){
        const {itemInfo} = this.props
        const img = `/img/${itemInfo.categories}/${itemInfo.name}.jpg`
        
        return(
            this.state.itemDisplay && 
            (<div className='CartItemWrapper'>
                <div className="product">
                    <div className="imgWrapper">
                        <img src={img} alt="product" />
                    </div>
                    <div className="content">
                        <h6>{itemInfo.name}</h6>
                        <div> <span className='boldTitle'>CATEGORIES </span><br /> {itemInfo.categories}</div>
                        <div> <span className='boldTitle'>INVENTORY  </span><br /> {itemInfo.inventory}</div>
                    </div>
                </div>
                <div className="price">{itemInfo.price}</div>
                <div className="quantity">
                    <select name="quantity" id="" onChange={this.handleSelect}>
                        <option ></option>
                        <option value='1'>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="totalPrice">{this.state.totalPrice}</div>
                <FontAwesomeIcon icon={faTimes} className='timesIcon' onClick={this.handleItemDelete}
                 />
            </div>)
        )
    }
}

export default Item