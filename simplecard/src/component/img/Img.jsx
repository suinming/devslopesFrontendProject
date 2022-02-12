import React, { Component } from 'react';
import './Img.css'

class Img extends Component {
    render() {
        const {imgUrl} = this.props
        return (
            <div className='imgWrapper'>
                <img src={imgUrl} alt="person" />
            </div>
        );
    }
}

export default Img;