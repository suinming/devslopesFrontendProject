import React from 'react'
import Item from '../Item/Item'
import Shipping from '../Shipping/Shipping'
import Summary from '../Summary/Summary'
import './Cart.css'

class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            priceArr: [],
            quantityArr:[],
            totalPrice:0,
            discount:0,
            status:0,
            isPageFinished:false,
            toNextPage:false,
        }
    }

    setInitialPriceArr = (itemData) =>{
        const priceArr = []
        itemData.map(item => priceArr.push(item.price))
        this.setState({
            priceArr: priceArr
        })
    }

    sumPriceArr = (arr) =>{
        this.setState({
            totalPrice : arr.reduce( (prev, current) => (Number(prev) + Number(current)).toFixed(2),0 )
        })
        
    }

    pushElementToArr = (val,quantity,index) =>{
        this.setState(prevState => {
            const { priceArr } = prevState;
            const {quantityArr} = prevState;
            priceArr[index] = val;
            quantityArr[index] = quantity;
            return {priceArr,quantityArr}
            
        },() => {this.sumPriceArr(this.state.priceArr)})
    }

    handlePageFinished = () => {
        /* organized data*/
        let selectedItemIndex, selectedItem, selectedPriceArr, selectedQuantityArr;
        let data = [] 
        const {priceArr, quantityArr} = this.state

        selectedItemIndex = (priceArr).map((item,index) => item === null? null : index)
                        .filter(item => item !== null)
        
        selectedItem = (this.props.itemData).map((item,index) => selectedItemIndex.includes(index) ? item : null)
                    .filter(item => item!==null)
        
        selectedPriceArr = priceArr.filter(item => item !== null )
        
        selectedQuantityArr = quantityArr.filter(item => item !== null )

        for (let i = 0; i < selectedQuantityArr.length; i++) {
            let tempObject = {item:null, price:null, quantity:null}
            tempObject.item = selectedItem[i]
            tempObject.price = selectedPriceArr[i]
            tempObject.quantity = selectedQuantityArr[i]
            data.push(tempObject)
        }

        if(this.state.totalPrice !== 0){
            this.setState({
                isPageFinished: true,
                toNextPage:true,
                data:data,
            })
        }
    }

    render(){    
        const {totalPrice, discount, status, isPageFinished,
            toNextPage, quantityArr, data} = this.state
        const {itemData} = this.props
        return(
            (toNextPage ? 
            <Shipping 
            homepageData = {itemData}
            itemData = {data} 
            totalPrice = {totalPrice}
            discount = {discount}
            />:
            <div className='container'>
                <div className='cart'>
                    <div className="colName">
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total Price</div>
                    </div>
                    {itemData.map( (item,index) => (
                        <Item 
                        itemInfo = {item}
                        index = {index}
                        pushElementToArr = {this.pushElementToArr}
                        />
                    ))}
                </div>
                <Summary
                itemData={null}
                totalPrice = {totalPrice}
                discount ={discount}
                quantityArr = {quantityArr}
                status = {status}
                isPageFinished = {isPageFinished}
                handlePageFinished={this.handlePageFinished}
                />
            </div>
            )
            
        )
    }
}

export default Cart