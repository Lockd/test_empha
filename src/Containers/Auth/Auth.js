import React, { Component } from 'react';
import { updateObject, checkValidity } from '../../shared/utility';
import {connect} from 'react-redux'

import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

import * as actions from '../../store/actions';

import classes from './Auth.module.css';
import { Redirect } from 'react-router';

class Auth extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your username'
                },
                value: '',
                validation: {
                    required: true,
                },
                label: 'Login',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                label: 'Password',
                valid: false,
                touched: false
            }
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value);
    }

    render() {
        const redirect = <Redirect to='/users' />;
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                label={formElement.config.label}
                key={formElement.id}
                inputtype={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />));
        return (
            <div className={classes.auth}>
                {this.props.isLoggedIn ? redirect : null}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div className={classes.buttonsWrapper}>
                        <Button className={classes.auth__button} btnType='Success'>Отправить</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      isLoggedIn: state.auth.token !== null
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);