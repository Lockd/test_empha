import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

class Navigation extends Component {
    render() {
        return (
            <nav className={classes.navigation__wrapper}>
                <ul className={classes.navigation}>
                    <li className={classes.navigation__item}>{this.props.isLoggedIn
                        ? <NavLink className={classes.navigation__link} to='/logout'>Выйти</NavLink>
                        : <NavLink className={classes.navigation__link} to='/login'>Войти в систему</NavLink>
                    }</li>
                    <li className={classes.navigation__item}><NavLink className={classes.navigation__link} to='/add-user'>Добавить пользователя</NavLink></li>
                    <li className={classes.navigation__item}><NavLink className={classes.navigation__link} to='/users'>Список пользователей</NavLink></li>
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