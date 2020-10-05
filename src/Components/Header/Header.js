import React from 'react';
import Navigation from '../../Containers/Navigation/Navigation';

import './Header.scss';

const header = (props) => {
    return (
        <header className='header'>
            <Navigation />
        </header>
    );
}

export default header;