import React from 'react'
import './SearchInput.css'
import SearchResult from '../SearchResult/SearchResult'

class SearchInput extends React.Component{
    constructor(){
        super()
        this.state = {
            inputData:null,
        }
    }

    handleInputData = ({target:{value}}) =>{
        this.setState( () => ({inputData : value}))
    }

    render(){    
        return(
            <>
            <div className='inputWrapper'>
                <input type="text" 
                className='searchInput' 
                onChange = {this.handleInputData}
                placeholder='Search for the product or categories'/>
            </div>
            <SearchResult 
            input = {this.state.inputData} 
            data = {this.props.data} 
            popupClick = {this.props.popupClick}/>
            </>
        )
    }
}

export default SearchInput