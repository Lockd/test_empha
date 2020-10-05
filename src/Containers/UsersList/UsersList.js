import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './UsersList.scss';

class UserList extends Component {
    componentDidMount() {
        if (this.props.token) {
            this.props.getUsersList(this.props.token);
        }
    }

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
            usersList = (
                <Fragment>
                    {usersArray.map(user => (
                        <div className='userCard' key={user.config.id}>
                            <p>{user.config.id}</p>
                            <p>{user.config.username}</p>
                            <p>{user.config.firstName}</p>
                            <p>{user.config.secondName}</p>
                            <p>{user.config.lastLogin}</p>
                            <p>{user.config.isSuperuser}</p>
                        </div>
                    ))}
                </Fragment>
            );
        }

        return (
            <div className='usersList'>
                <button onClick={this.onChangeSortMethod}>Сортировать по id</button>
                <div className='usersHeader'>
                    <p>id</p>
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