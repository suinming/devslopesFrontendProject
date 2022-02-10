import React, { Component } from 'react';
import './Homepage.css'
import Cart from '../Cart/Cart'
import Service from '../../services'
import SearchInput from '../SearchInput/SearchInput';
import Popup from '../Popup/Popup';
import HomepageCartStatus from '../HomepageCartStatus/HomepageCartStatus';

class Homepage extends Component {
    state ={
        data:[],
        loading:false, 
        error:false,   
        isPageFinished:false,
        popup:false,
        popupItemIndex:null,
        cartItem:[]
    }

    componentDidMount(){
        this.setState({loading:true})
        const service = new Service()
        service.fetchCommerceAPI(25)
                .then( res => {
                if(res){
                    this.setState({
                        data: res,
                        loading:false,
                    })
                } else{
                    this.setState({
                        loading:false,
                    })
                }
            }, error => {
                console.log(error)
                this.setState({
                    loading:false,
                    error:true
                })
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

    handlePopupClick = (e) =>{
        let popup = this.state.popup
        let index = e.currentTarget.dataset.index
        this.setState({
            popup: !popup,
            popupItemIndex: index,
        })
    }

    popupClose = () =>{
        let popup = this.state.popup
        this.setState({
            popup: !popup,
        })
    }

    addToCart = (e) =>{
        const index = e.currentTarget.dataset.index
        const {cartItem, data} = this.state
        let isRepeat = cartItem.includes(data[index])
        if(!isRepeat){
            this.setState({
            cartItem: [...cartItem, data[index]],
            })
        }
    }

    handlePageFinished = () => { 
        const {cartItem, isPageFinished} = this.state 
        if(cartItem.length >= 1){
            this.setState({isPageFinished: !isPageFinished})
        }
    }

    render() {
        const {data, loading, isPageFinished, 
            popup, popupItemIndex, cartItem} = this.state

        if(loading){
            return(<div class="loader"></div>)
        } else if(popup){
            return(<Popup 
                data = {data[popupItemIndex]} 
                index = {popupItemIndex}
                popupClose = {this.popupClose}
                addToCart = {this.addToCart}
                /> )
        } else if (isPageFinished){
            return(<Cart itemData = {cartItem}/>)
        } else{
            return(
            <div className='homepageContainer'>
                {/* left section in homepage*/}
                <div className='result'>
                    <SearchInput data = {data} popupClick = {this.handlePopupClick}/>
                </div>
                {/* left section in homepage*/}
                <HomepageCartStatus data = {cartItem} handlePageFinished = {this.handlePageFinished}/>
            </div>
            )
        }

    }
}

export default Homepage;