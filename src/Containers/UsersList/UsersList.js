import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import classes from './UsersList.module.css';

class UserList extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            this.props.getUsersList(this.props.token);
        }
    }

    render() {
        let usersList = <h1>List is still loading</h1>;
        if (this.props.usersData) {
            const usersArray = [];
            for (let key in this.props.usersData) {
                const config = {
                    id: this.props.usersData[key].id,
                    username: this.props.usersData[key].username,
                    firstName: this.props.usersData[key].first_name,
                    secondName: this.props.usersData[key].second_name,
                    isActive: this.props.usersData[key].is_active,
                    lastLogin: this.props.usersData[key].last_login,
                    isSuperuser: this.props.usersData[key].is_superuser
                }
                usersArray.push({ key: key, config: config })
            }
            usersList = usersArray.map(user => (
                <div className={classes.userCard} key={user.config.id}>
                    <p>{user.config.username}</p>
                    <p>{user.config.firstName}</p>
                    <p>{user.config.secondName}</p>
                    <p>{user.config.lastLogin}</p>
                    <p>{user.config.isSuperuser}</p>
                </div>
            ))
        }

        return (
            <div className={classes.usersList}>
                <div className={classes.usersHeader}>
                    <p>Username</p>
                    <p>Имя</p>
                    <p>Фамилия</p>
                    <p>Последний раз был в сети</p>
                    <p>Суперюзер?</p>
                </div>
                {usersList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersData: state.users.usersData,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: (token) => dispatch(actions.fetchUsers(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);