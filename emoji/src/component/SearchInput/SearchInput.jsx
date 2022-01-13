import React from 'react'
import './SearchInput.css'
import EmojiResult from '../EmojiResult/EmojiResult'

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
            <div className='inputWrapper'>
                <input type="text" 
                className='searchInput' 
                onChange = {this.handleInputData}
                placeholder='Search for the emoji'/>
                <EmojiResult input = {this.state.inputData}/>
            </div>
        )
    }
}

export default SearchInput