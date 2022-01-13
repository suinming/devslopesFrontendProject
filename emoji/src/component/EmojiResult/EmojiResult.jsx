import React from 'react'
import './EmojiResult.css'
import EmojiRow from '../EmojiRow/EmojiRow'
import {data} from '../data'

class EmojiResult extends React.Component{

    search = (input) => {
        input = input.toLowerCase()

        let arr = data.map( (item, index) => {
            let pattern = item.title.slice(0, input.length).toLowerCase();
            if( pattern === input){
            return index;
            } else{
            return 'not match';
            }
        })
        arr = arr.filter( item => typeof item === 'number' )
        return arr
    }

    render(){
        if(this.props.input === null){
            return(
                <div className='resultWrapper'>
                    {[...Array(20)]
                    .map((_, index) => index)
                    .map(index => <EmojiRow index = {index}/> )}
                </div>
            )  
        } else{
            let indexArr = this.search(this.props.input)
            if(indexArr.length !== 0){
                return(
                    <div className='resultWrapper'>
                        {indexArr
                        .map(index => <EmojiRow index = {index}/> )}
                    </div>
                )
            } else{
                return(
                    <div className='resultWrapper'>
                        <EmojiRow index = {null}/>
                    </div>
                )
            }
        }
    }
}

export default EmojiResult