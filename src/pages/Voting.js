import React, {Component} from 'react';
import {observer, inject, observable, runInAction} from 'mobx-react';
import {action} from 'mobx';
import {upvotePokemon, downvotePokemon} from '../services/api';

import './Voting.css';

@inject('store')
@observer
class Voting extends Component {

  @action.bound handleVoteUp() {
    upvotePokemon(this.props.pokemonId);
  }

  @action.bound handleVoteDown() {
    downvotePokemon(this.props.pokemonId);
  }

  render() {
    return (
      <div>
        <div className="voting__container">
          <img onClick={this.handleVoteUp} className="voting__icons" src={this.props.store.votes.slice().filter((vote) => {
            return vote.id === this.props.pokemonId;
          })[0].urlUp} role="presentation" /><p className="voting__text">Like</p><img onClick={this.handleVoteDown} className="voting__icons" src={this.props.store.votes.slice().filter((vote) => {
            return vote.id === this.props.pokemonId;
          })[0].urlDown} role="presentation" /><p className="voting__text">Dislike</p>
        </div>
      </div>
    );
  }
}

export default Voting;
