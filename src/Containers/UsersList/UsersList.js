import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './UsersList.scss';

class UserList extends Component {
    state = {
        sort: undefined
    }

    componentDidMount() {
        if (this.props.token) {
            this.props.getUsersList(this.props.token);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.token !== this.props.token) {
            this.props.getUsersList(this.props.token);
        }
    }

    onSortMethodChanged = (event) => {
        this.setState({ sort: event.target.value })
        this.forceUpdate();
    }

    render() {
        const ID_SORT_DESCENDING = 'ID_SORT_DESCENDING';
        const ID_SORT_ASCENDING = 'ID_SORT_ASCENDING';

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
            if (this.state.sort === ID_SORT_ASCENDING) {
                usersArray.sort((prevEl, el) => {
                    return prevEl.config.id - el.config.id;
                })
            } else if (this.state.sort === ID_SORT_DESCENDING){
                console.log('YA ZAWEL');
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
        usersData: state.users.users.data,
        usersDataIdAscending: state.users.users.idSortedAscending,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersList: (token) => dispatch(actions.fetchUsers(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);