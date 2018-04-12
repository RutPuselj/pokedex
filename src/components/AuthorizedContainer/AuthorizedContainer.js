import React, {Component} from 'react';
import './AuthorizedContainer.css';
import {Link} from 'react-router';
import {logoutUser} from '../../services/api';

import logoURL from '../../assets/logo.png';

class AuthorizedContainer extends Component {

  render() {
    return (
      <div className="authorized-container__container">
        <div className="authorized-container__header">
          <Link to="/pokedex"><img className="authorized-container__logo" src={logoURL} alt="" /></Link>
          <div className="authorized-container__buttons">
            <Link to="/pokedex"><button className="authorized-container__button">Pokédex</button></Link>
            <Link to="/"><button className="authorized-container__button" onClick={() => logoutUser()}>Logout</button></Link>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AuthorizedContainer;
