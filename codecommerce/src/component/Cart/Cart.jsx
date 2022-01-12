import React from 'react'
import Item from '../Item/Item'
import Shipping from '../Shipping/Shipping'
import Summary from '../Summary/Summary'
import './Cart.css'

class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            itemData:[
            {imgUrl:'https://cdn.clothingshoponline.com/Images/Color/19817_f_fm.jpg',name:'Heavyweight Hooded Sweatshirt', price:22.04, size:'M', color:'White', },
            {imgUrl:'https://cdn.clothingshoponline.com/Images/Color/19979_f_fm.jpg',name:'SweatPants', price:11.15, size:'S', color:'Ash', },
            {imgUrl:'https://cdn.clothingshoponline.com/Images/Color/52352_f_fm.jpg',name:'Softstyle® T-Shirt', price:3.5, size:'M', color:' Carolina Blue', },
            {imgUrl:'https://cdn.clothingshoponline.com/Images/Color/17673_f_fm.jpg',name:'Unisex Jersey Long Sleeve Tee', price:8.49, size:'L', color:'Heather Navy', },
            {imgUrl:'https://cdn.clothingshoponline.com/Images/Color/17763_f_fm.jpg',name:'Ultra Cotton® Long Sleeve T-Shirt', price:6.21, size:'XL', color:'Gold', },
            ],
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
        let itemData = [] 

        selectedItemIndex = (this.state.priceArr).map((item,index) => item === null? null : index)
                        .filter(item => item!==null)
        
                        selectedItem = (this.state.itemData).map((item,index) => selectedItemIndex.includes(index) ? item : null)
                    .filter(item => item!==null)
        
        selectedPriceArr = (this.state.priceArr).filter(item => item !== null )
        
        selectedQuantityArr = (this.state.quantityArr).filter(item => item !== null )

        for (let i = 0; i < selectedQuantityArr.length; i++) {
            let tempObject = {item:null, price:null, quantity:null}
            tempObject.item = selectedItem[i]
            tempObject.price = selectedPriceArr[i]
            tempObject.quantity = selectedQuantityArr[i]
            itemData.push(tempObject)
        }

        if(this.state.totalPrice !== 0){
            this.setState({
                isPageFinished: true,
                toNextPage:true,
                itemData:itemData,
            })
        }
    }

    render(){    
        const {totalPrice, discount, status, isPageFinished,
            toNextPage, itemData, quantityArr} = this.state
        return(
            (toNextPage ? 
            <Shipping 
            itemData = {itemData} 
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