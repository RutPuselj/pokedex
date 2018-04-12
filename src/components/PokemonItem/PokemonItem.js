import React from 'react';
import {Link} from 'react-router';
import store from '../../state/store';

import './PokemonItem.css';

const PokemonItem = ({pokemon}) => (
  <Link to={`/pokemon/${pokemon.id}`}>
    <div className="pokemon-item__container">
      <img className="pokemon-item__avatar" src={`https://pokedex.byinfinum.co/${pokemon.attributes['image-url']}`} alt=""/>
      <div className="pokemon-item__name-and-icons">
        <h1 className="pokemon-item__name">{pokemon.attributes.name}</h1>
        <div className="pokemon-item__icons">
          <img className="pokemon-item__thumbs-up" src={store.votes.slice().filter((vote) => {
            return vote.id === pokemon.id;
          })[0].urlUp} role="presentation" /> <img className="pokemon-item__thumbs-down" src={store.votes.slice().filter((vote) => {
            return vote.id === pokemon.id;
          })[0].urlDown} role="presentation" />
        </div>
      </div>
      <p className="pokemon-item__description">{pokemon.attributes.description}</p>
    </div>
  </Link>
);

export default PokemonItem;
