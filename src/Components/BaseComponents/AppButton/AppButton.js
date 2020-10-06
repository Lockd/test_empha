import React from 'react';
import './AppButton.scss';

const appButton = (props) => (
    <button 
        disabled={props.disabled}
        className={['app-button', `${props.btnType}`].join(' ')}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default appButton;