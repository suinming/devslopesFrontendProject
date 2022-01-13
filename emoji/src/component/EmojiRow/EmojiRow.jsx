import React from 'react'
import './EmojiRow.css'
import {data} from '../data'

class EmojiRow extends React.Component{

    handleOnclick = (emoji) => {
        navigator.clipboard.writeText(emoji)
    
    }

    render(){  
        const {index} = this.props
        
        if(index !== null ){
            return(
                <div className='row' onClick={this.handleOnclick(data[index].symbol)}>
                    {data[index].symbol}
                    {data[index].title}
                    <span className='copyMessage'>Click to copy the emoji</span>
                </div>
            )
        }else{
            return(
                <div className='row'>
                    <span>We don't have the emoji you want! 
                        Please search again</span>
                </div>
            )
        }
    }   
}

export default EmojiRow