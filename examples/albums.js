import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: '',
});

const albums = spotify.search.albums('Incubus');
// console.log(albums);

albums.then((data) => {
  data.albums.items.map(item => console.log(item.name));
})
  .catch(error => console.log(error));
