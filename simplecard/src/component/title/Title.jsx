import React, { Component } from 'react';
import './Title.css'

class Title extends Component {
    render() {
        const {title} = this.props
        return (
            <div className='title'>
                {title}
            </div>
        );
    }
}

export default Title;