import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnterButtonDisabled: true,
      artistBand: '',
      artist: '',
      loading: false,
      returnAPI: false,
      arrayArtist: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const characters = 2;
    if (event.target.value.length >= characters) {
      this.setState({
        isEnterButtonDisabled: false,
        artistBand: event.target.value,
        artist: event.target.value,
      });
    } else {
      this.setState({
        isEnterButtonDisabled: true,
      });
    }
  }

  async handleClick() {
    const { artistBand } = this.state;

    this.setState({
      loading: true,
    });

    const array = await searchAlbumsAPIs(artistBand);

    this.setState({
      loading: false,
      returnAPI: true,
      arrayArtist: array,
      artistBand: '',
    });
  }

  render() {
    const {
      isEnterButtonDisabled,
      loading,
      returnAPI,
      artist,
      arrayArtist } = this.state;

    if (loading === true) return <Loading />;
    return (
      <div data-testid="page-search">
        <label htmlFor="search">
          Search
          <input
            id="search"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isEnterButtonDisabled }
          onClick={ this.handleClick }
        >
          Pesquisar

        </button>

        {returnAPI
        === true
          && (
            <p>
              Resultado de álbuns de:
              {' '}
              { artist }
            </p>)}

        <ul>
          {arrayArtist.length > 0
            ? arrayArtist
              .map((album, index) => (
                <div key={ index }>
                  <li>{ album.collectionName }</li>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    link

                  </Link>

                </div>
              ))
            : 'Nenhum álbum foi encontrado' }
          {' '}
        </ul>

      </div>
    );
  }
}

export default Search;
