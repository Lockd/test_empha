import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

class Navigation extends Component {
    render() {
        return (
            <nav className='navigation-wrapper'>
                <ul className='navigation'>
                    <li className='navigation__item'>{this.props.isLoggedIn
                        ? <NavLink className='navigation__link' to='/logout'>Выйти</NavLink>
                        : <NavLink className='navigation__link' to='/login'>Войти в систему</NavLink>
                    }</li>
                    <li className='navigation__item'><NavLink className='navigation__link' to='/add-user'>Добавить пользователя</NavLink></li>
                    <li className='navigation__item'><NavLink className='navigation__link' to='/users'>Список пользователей</NavLink></li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Navigation);