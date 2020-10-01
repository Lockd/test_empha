import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserList extends Component {
    render() {
        return(
            <div><h1>You are signed in!</h1></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(UserList);