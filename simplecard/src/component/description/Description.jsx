import React, { Component } from 'react';
import './Description.css'

class Description extends Component {
    render() {
        const {description} = this.props
        return (
            <div className='description'>
                {description}
            </div>
        );
    }
}

export default Description;