import React from 'react';
import Navigation from '../../Containers/Navigation/Navigation';
// import About from '../About/About';

import './Header.scss';

const header = props => {
    return (
        <div className='header'>
            {/* <About /> */}
            <Navigation />
        </div>
    );
}

export default header;