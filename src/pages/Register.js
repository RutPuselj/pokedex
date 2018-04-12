import React, {Component} from 'react';
import {createUser} from '../services/api';

import logoURL from '../assets/logo.png';
import pokeBall from '../assets/pokeball_ball.png';

import './Register.css';

class RegisterPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.saveUsername = this.saveUsername.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.saveConfirmedPassword = this.saveConfirmedPassword.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  saveUsername(event) {
    this.setState({username: event.target.value});
  }

  saveEmail(event) {
    this.setState({email: event.target.value});
  }

  savePassword(event) {
    this.setState({password: event.target.value});
  }

  saveConfirmedPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }

  onRegister() {
    createUser(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)
      .then(() => this.props.router.push('/pokedex'));
  }

  render() {
    return (
      <div className="register__container">
        <div className="register__imageContainer">
          <img className="register__logo" src={logoURL} role="presentation" />
          <img className="register__pokeball" src={pokeBall} role="presentation" />
        </div>
        <input type="text" name="username" placeholder="Username" onChange={this.saveUsername}/>
        <input type="text" name="email" placeholder="E-mail" onChange={this.saveEmail}/>
        <input type="password" name="password" placeholder="Password" onChange={this.savePassword} />
        <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={this.saveConfirmedPassword} />
        <button className="register__registerButton" type="button" value="Register" onClick={this.onRegister}>REGISTER</button>
      </div>
    );
  }
}

export default RegisterPage;
