import {observable} from 'mobx';

class Store {
  constructor() {
    this.pokemons = [];
    this.pokemon = [];
    this.loading = false;
    this.comments = [];
    this.commentsUsers = [];
    this.votes = [];
    this.links = [];
  }

}

export default observable.object(new Store());
