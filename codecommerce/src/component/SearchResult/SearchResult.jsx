import React, { Component } from 'react';
import './SearchResult.css'
import Item from '../Item/Item';
import HomepageItem from '../HomepageItem/HomepageItem';

class SearchResult extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    search = (input, data) => {
        let  displayItemArr = data.filter(element => element.name.includes(input) || 
                            element.categories.includes(input))
        if(input === null){
            displayItemArr = data
        }
        return displayItemArr
    }

    render() {
        const {input, data} = this.props
        const displayItemArr = this.search(input, data)

        return (
            <>
            <div className="colName">Product</div>
            <div className='searchResultContainer'>
                {displayItemArr.map( (item, index) => (
                    // <Item  // 1. create a new component 'homepageitem', 
                    //        // while click on this item can show the detail info and add to the summary
                    //        // 2. hompageitem component should display like a card (like project in pokemonAPI)
                    // itemInfo = {item}
                    // index = {index}
                    // key={item.name}
                    // pushElementToArr = {this.pushElementToArr}
                    // />
                    <HomepageItem 
                    itemInfo = {item}
                    index = {index}
                    key={item.name}
                    popupClick = {this.props.popupClick}
                    />
                ))}
            </div>
            </>
        );
    }
}

export default SearchResult;