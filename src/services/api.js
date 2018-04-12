import {save, read} from './storage';
import store from '../state/store';
import {runInAction} from 'mobx';

import thumbDownURL from '../assets/thumb_down.png';
import thumbUpURL from '../assets/thumb_up.png';

import thumbDownSelectedURL from '../assets/thumb_down_selected.png';
import thumbUpSelectedURL from '../assets/thumb_up_selected.png';


export function createUser(username, email, password, confirmPassword) {
  return fetch('https://pokedex.byinfinum.co/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'users',
        attributes: {
          username: username,
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    })
  }).then((response) => response.json());
}


export function loginUser(email, password) {
  return fetch('https://pokedex.byinfinum.co/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      data: {
        type: 'session',
        attributes: {
          email: email,
          password: password
        }
      }
    })
  }).then((response) => response.json())
    .then((json) => {
      save('auth-token', json.data.attributes['auth-token']);
      save('email', json.data.attributes.email);
      save('username', json.data.attributes.username);
    });
}


export function getPokemon(id) {
  runInAction(() => (store.loading = true));
  if (store.pokemon.slice().filter((pokemon) => {
    return pokemon.id === id;
  }).length <= 0) {
    return fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
      }
    }).then((response) => response.json())
      .then((res) => {
        runInAction(() => {
          store.pokemon.push(res.data);
        });
      }).then(() => {
        runInAction(() => {
          if (store.pokemons.length <= 0) {
            if (store.pokemon.slice().filter((pokemon) => {
              return pokemon.id === id;
            })[0].attributes['voted-on'] === 1) {
              store.votes.push({id: id, urlUp: thumbUpSelectedURL, urlDown: thumbDownURL});
            } else if (store.pokemon.slice().filter((pokemon) => {
              return pokemon.id === id;
            })[0].attributes['voted-on'] === -1) {
              store.votes.push({id: id, urlUp: thumbUpURL, urlDown: thumbDownSelectedURL});
            } else {
              store.votes.push({id: id, urlUp: thumbUpURL, urlDown: thumbDownURL});
            }
          }
          store.loading = false;
        });
      });
  }
  runInAction(() => (store.loading = false));
  return Promise.resolve(store.pokemon);
}


export function getPokemons() {
  runInAction(() => (store.loading = true));
  if (store.pokemons.length <= 0) {
    return fetch('https://pokedex.byinfinum.co/api/v1/pokemons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
      }
    }).then((response) => response.json())
      .then((res) => {
        runInAction(() => {
          store.pokemons = res.data;
        });
      })
      .then(() => {
        runInAction(() => {
          store.pokemons.slice().forEach((pokemon) => {
            if (pokemon.attributes['voted-on'] === 1) {
              store.votes.push({id: pokemon.id, urlUp: thumbUpSelectedURL, urlDown: thumbDownURL});
            } else if (pokemon.attributes['voted-on'] === -1) {
              store.votes.push({id: pokemon.id, urlUp: thumbUpURL, urlDown: thumbDownSelectedURL});
            } else {
              store.votes.push({id: pokemon.id, urlUp: thumbUpURL, urlDown: thumbDownURL});
            }
            store.loading = false;
          });
        });
      });
  }
  runInAction(() => (store.loading = false));
  return Promise.resolve(store.pokemons);
}


export function getComments(id) {
  fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    }
  }).then((response) => response.json())
    .then((res) => {
      runInAction(() => {
        store.comments = res.data;
        store.commentsUsers = res.included;
        store.links = res.links;
      });
    });
  return Promise.resolve(store.comments, store.commentsUsers, store.links);
}


export function postComment(id, comment) {
  return fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    },
    body: JSON.stringify({
      data: {
        attributes: {
          content: comment
        }
      }
    })
  }).then((response) => response.json());
}


export function logoutUser() {
  return fetch('https://pokedex.byinfinum.co/api/v1/users/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    }
  }).then((response) => response.json())
    .then(() => {
      store.pokemons = [];
      store.pokemon = [];
    });
}


export function deleteComment(pokemonID, id) {
  return fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${pokemonID}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    }
  }).then((response) => response.json());
}


export function upvotePokemon(id) {
  return fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${id}/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    }
  }).then((response) => response.json())
    .then(() => {
      runInAction(() => {
        store.votes.slice().filter((vote) => {
          return vote.id === id;
        })[0].urlUp = thumbUpSelectedURL;
        store.votes.slice().filter((vote) => {
          return vote.id === id;
        })[0].urlDown = thumbDownURL;
      });
    });
}


export function downvotePokemon(id) {
  return fetch(`https://pokedex.byinfinum.co/api/v1/pokemons/${id}/downvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${read('auth-token')}, email=${read('email')}`
    }
  }).then((response) => response.json())
    .then(() => {
      runInAction(() => {
        store.votes.slice().filter((vote) => {
          return vote.id === id;
        })[0].urlUp = thumbUpURL;
        store.votes.slice().filter((vote) => {
          return vote.id === id;
        })[0].urlDown = thumbDownSelectedURL;
      });
    });
}
