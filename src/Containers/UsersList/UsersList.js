import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import AppInput from '../../Components/BaseComponents/AppInput/AppInput';

import { updateObject } from '../../shared/utility';

import './UsersList.scss';

class UserList extends Component {
    state = {
        sort: undefined,
        filter: {
            value: '',
            validate: false
        },
        users: undefined
    }

    componentDidMount() {
        if (this.props.token) {
            this.props.getUsersList(this.props.token);
        }
        if (this.props.usersData) {
            this.mapUsersFromPropsToState();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            this.props.getUsersList(this.props.token);
        }
        if (this.props.usersData !== prevProps.usersData) {
            this.mapUsersFromPropsToState();
        }
    }

    mapUsersFromPropsToState = () => {
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
        this.setState({ users: usersArray });
    }

    onSortMethodChanged = (event) => {
        this.setState({ sort: event.target.value })
        this.forceUpdate();
    }

    onInputChangedHandler = (event) => {
        const updatedFilter = updateObject(this.state.filter, {
            value: event.target.value,
        });

        this.setState({ filter: updatedFilter })
    }

    render() {
        const ID_SORT_DESCENDING = 'ID_SORT_DESCENDING';
        const ID_SORT_ASCENDING = 'ID_SORT_ASCENDING';

        let usersList = <h1>List is still loading</h1>;

        if (this.state.users) {            
            let usersArray = this.state.users.map((user) => (user));

            if (this.state.filter.value) {
                usersArray = usersArray.filter(user => {
                    return user.config.username.indexOf(this.state.filter.value) !== -1;
                });
                console.log('users', usersArray);
            }

            if (this.state.sort === ID_SORT_ASCENDING) {
                usersArray.sort((prevEl, el) => {
                    return prevEl.config.id - el.config.id;
                })
            } else if (this.state.sort === ID_SORT_DESCENDING) {
                usersArray.sort((prevEl, el) => {
                    return el.config.id - prevEl.config.id;
                })
            }

            usersList = usersArray.map(user => (
                <div className='userCard' key={user.config.id}>
                    <p>{user.config.id}</p>
                    <p>{user.config.username}</p>
                    <p>{user.config.firstName}</p>
                    <p>{user.config.secondName}</p>
                    <p>{user.config.lastLogin}</p>
                    <p>{user.config.isSuperuser}</p>
                </div>
            ));
        }

        return (
            <div className='usersList'>
                <div>
                    сортировать по
                    <select onChange={this.onSortMethodChanged}>
                        <option value='undefined'></option>
                        <option value={ID_SORT_ASCENDING}>возрастанию id</option>
                        <option value={ID_SORT_DESCENDING}>убыванию id</option>
                    </select>
                </div>


                <AppInput
                    label='Filter by username'
                    inputtype='text'
                    value={this.state.filter.value}
                    shouldValidate={this.state.filter.validate}
                    changed={(event) => this.onInputChangedHandler(event)}
                />

                <div className='usersHeader'>
                    <p>id</p>
                    <p>Username</p>
                    <p>First name</p>
                    <p>Second name</p>
                    <p>Last log in</p>
                    <p>Is superuser?</p>
                </div>
                {usersList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersData: state.users.users.data,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: (token) => dispatch(actions.fetchUsers(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);