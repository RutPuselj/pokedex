import React, {Component} from 'react';
import {getPokemon, getComments} from '../services/api';
import PokemonItemDetails from '../components/PokemonItemDetails/PokemonItemDetails';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class PokemonDetailsPage extends Component {

  componentWillMount() {
    getPokemon(this.props.params.id);
    getComments(this.props.params.id);
  }

  render() {
    const {loading, pokemon, comments, commentsUsers, links} = this.props.store;
    return (
      loading
        ? <div className='pokemon-details__loading'>Loading...</div>
        : <div className='pokemon-details__container'>
          {
            pokemon.slice().filter((thisPokemon) => {
              return thisPokemon.id === this.props.params.id;
            }).map((pokemon) => <PokemonItemDetails key={pokemon.id} pokemon={pokemon} comments={comments} commentsUsers={commentsUsers} links={links} />)
          } </div>
    );
  }
}

export default PokemonDetailsPage;
