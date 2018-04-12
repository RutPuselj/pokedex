import React, {Component} from 'react';
import {loginUser} from '../services/api';
import {Link} from 'react-router';

import logoURL from '../assets/logo.png';
import pokeBall from '../assets/pokeball_ball.png';

import './Login.css';


class LoginPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  saveEmail(event) {
    this.setState({email: event.target.value});
  }

  savePassword(event) {
    this.setState({password: event.target.value});
  }

  onLogin() {
    loginUser(this.state.email, this.state.password)
      .then(() => this.props.router.push('/pokedex'));
  }

  render() {
    return (
      <div className="login__container">
        <div className="login__imageContainer">
          <img className="login__logo" src={logoURL} role="presentation" />
          <img className="login__pokeball" src={pokeBall} role="presentation" />
        </div>
        <div className="login__input">
          <input type="text" name="email" placeholder="E-mail" onChange={this.saveEmail} />
          <input type="password" name="password" placeholder="Password" onChange={this.savePassword}/>
        </div>
        <button className="login__loginButton" type="button" value="Login" onClick={this.onLogin}>LOGIN</button>
        <Link to="/register"><button className="login__registerButton">Register</button></Link>
      </div>
    );
  }
}

export default LoginPage;
