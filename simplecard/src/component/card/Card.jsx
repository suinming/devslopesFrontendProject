import React, { Component } from 'react';
import Img from '../img/Img';
import Title from '../title/Title';
import Description from '../description/Description';

import './Card.css'

class Card extends Component {
    render() {
        const {imgUrl, title, description} = this.props.data
        return (
            <div className='card'>
                <Img imgUrl = {imgUrl}/>
                <div className="content">
                    <Title title ={title}/>
                    <Description description = {description}/>
                </div>
            </div>
        );
    }
}

export default Card;