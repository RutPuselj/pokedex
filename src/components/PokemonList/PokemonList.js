import React from 'react';
import PokemonItem from '../PokemonItem/PokemonItem';

import './PokemonList.css';


const PokemonList = ({pokemons}) => (
  <div className="pokemon-list__container">
    {
      pokemons.map((pokemon) => <PokemonItem key={pokemon.id} pokemon={pokemon} />)
    }
  </div>
);

export default PokemonList;
