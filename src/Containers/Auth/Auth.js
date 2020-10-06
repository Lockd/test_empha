import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';

import AppInput from '../../Components/BaseComponents/AppInput/AppInput';
import AppButton from '../../Components/BaseComponents/AppButton/AppButton';

import { updateObject, checkValidity } from '../../shared/utility';
import { auth } from '../../store/actions';

import './Auth.scss';

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
                    isUsername: true,
                    maxLength: 150,
                    minLength: 1
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
                    isPassword: true,
                    minLength: 1,
                    maxLength: 128
                },
                label: 'Password',
                valid: false,
                touched: false
            }
        }
    }

    onInputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls })
    }

    onSubmitHandler = (event) => {
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
            <AppInput
                label={formElement.config.label}
                key={formElement.id}
                inputtype={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.onInputChangedHandler(event, formElement.id)}
            />));
        return (
            <div className='auth'>
                {this.props.isLoggedIn ? redirect : null}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    {this.props.error ? <div className='auth__error'>{this.props.error}</div> : null}
                    <div className='buttonsWrapper'>
                        <AppButton className='auth__button' btnType='success'>Continue</AppButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(auth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);