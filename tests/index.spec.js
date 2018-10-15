import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'bablabla',
    });
    expect(spotify.apiURL).to.be.equal('bablabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });

  describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.returns(Promise.resolve());
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('should throw TypeError when passed an invalid URL', () => {
      const spotify = new SpotifyWrapper({
        token: 'food',
      });
      expect(spotify.request.bind(spotify, 'url')).to.throw('Invalid URL');
    });

    it('should call fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'food',
      });
      spotify.request('https://api.spotify.com/v1');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the right url passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'food',
      });
      spotify.request('https://api.spotify.com/v1');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1');
    });

    it('should call fetch with the right headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'food',
      });
      const headers = {
        headers: {
          Authorization: 'Bearer food',
        },
      };
      spotify.request('https://api.spotify.com/v1');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1', headers);
    });
  });
});
