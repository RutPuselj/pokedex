import React, {Component} from 'react';
import {getPokemons} from '../services/api';
import PokemonList from '../components/PokemonList/PokemonList';
import {observer, inject} from 'mobx-react';

import './PokemonMain.css';

@inject('store')
@observer
class PokemonMainPage extends Component {

  componentWillMount() {
    getPokemons();
  }

  render() {
    const {loading, pokemons} = this.props.store;
    return (
      loading
        ? <div className='pokemon-main__loading'>Loading...</div>
        : <div className='pokemon-main__container'>
          <h1 className="pokemon-main__title">Pokédex</h1>
          <hr />
          <PokemonList pokemons={pokemons.slice()} />
        </div>
    );
  }
}

export default PokemonMainPage;
