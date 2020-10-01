import React from 'react';
import Navigation from '../../Containers/Navigation/Navigation';
// import About from '../About/About';

import classes from './Header.module.css';

const header = props => {
    return (
        <div className={classes.header}>
            {/* <About /> */}
            <Navigation />
        </div>
    );
}

export default header;