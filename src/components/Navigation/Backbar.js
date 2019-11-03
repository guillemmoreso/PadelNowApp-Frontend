import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';

class Backbar extends Component {
    render() {
        return (
            <div className='go-back'>
                <a onClick={() => {
                    this.props.history.goBack();
                }
                }> Back </a>
            </div>
        );
    }
}

export default Backbar;
