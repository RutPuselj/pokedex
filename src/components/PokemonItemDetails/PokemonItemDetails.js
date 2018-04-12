import React from 'react';
import {postComment} from '../../services/api';
import Voting from '../../pages/Voting';
import {observer} from 'mobx-react';

import './PokemonItemDetails.css';

let commentBody = '';

const PokemonItemDetails = observer(({pokemon, comments, commentsUsers, links}) => (
  <div className="pokemon-item-details__container">
    <h1 className="pokemon-item-details__name">{pokemon.attributes.name}</h1>
    <hr />
    <div className="pokemon-item-details__content">
      <img className="pokemon-item-details__avatar" src={`https://pokedex.byinfinum.co/${pokemon.attributes['image-url']}`} role="presentation" />
      <div className="pokemon-item-details__description">
        <p className="pokemon-item-details__description-titles">ABOUT</p>
        <p className="pokemon-item-details__text">{pokemon.attributes.description}</p>
        <div className="pokemon-item-details__info">
          <p className="pokemon-item-details__description-titles">INFO</p>
          <div className="pokemon-item-details__info-content">
            <div className="pokemon-item-details__height-weight">
              <p>HEIGHT</p>
              <p className="pokemon-item-details__text">{pokemon.attributes.height}'</p>
              <p>WEIGHT</p>
              <p className="pokemon-item-details__text">{pokemon.attributes.weight} lbs</p>
            </div>
            <div className="pokemon-item-details__gender-type">
              <p>GENDER</p>
              <p className="pokemon-item-details__text">{pokemon.attributes.gender}</p>
              <p>TYPE</p>
              <p className="pokemon-item-details__text">{pokemon.type}</p>
            </div>
          </div>
        </div>
        <Voting pokemonId={pokemon.id} />
        <button className="pokemon-item-details__button" onClick={() => alert(`I choose you ${pokemon.attributes.name}!`)}>CHOOSE POKEMON</button>
      </div>
    </div>
    <div className="pokemon-item-details__comments-container">
      <p className="pokemon-item-details__description-titles">COMMENTS</p>
      <div className="pokemon-item-details__comments">
        <div className="pokemon-item-details__comments-details">
          {
            comments.map(function(comment, i) {
              return <div className="pokemon-item-details__comment-content" key={i}>
                {
                  commentsUsers.map((element) => {
                    if (element.id === comment.relationships.author.data.id) {
                      return <div key={element.id}><p>{element.attributes.username}</p></div>;
                    }
                  })
                }
                <div className="pokemon-item-details__text">{comment.attributes.content}</div>
                <div className="pokemon-item-details__comment-date">
                  <div>Posted on {comment.attributes['created-at'].split('T')[0].split('-').reverse().join('.')}. at {comment.attributes['created-at'].split('T')[1].split('.')[0]}</div>
                </div>
              </div>;
            })
          }
        </div>
        <div className="pokemon-item-details__comments-post">
          <input className="pokemon-item-details__comment-input" type="text" name="comment"
            placeholder="Enter your comment" onChange={(event) => commentBody = event.target.value}/>
          <button className="pokemon-item-details__comments-button" onClick={() => {
            postComment(pokemon.id, commentBody).then((res) => {
              window.location.reload();
            });
          }}>POST</button>
        </div>
      </div>
    </div>
  </div>
  
));

export default PokemonItemDetails;
