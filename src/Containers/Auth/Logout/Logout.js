import React, {Component} from 'react';

import { connect } from "react-redux";
import { Redirect } from 'react-router';

import * as actions from '../../../store/actions';

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        this.props.logout();
        return(
            <Redirect to='/' />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);