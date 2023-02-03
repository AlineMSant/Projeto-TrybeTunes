import React from 'react';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnterButtonDisabled: true,
      artistBand: '',
      loading: false,
      returnAPI: false,
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

    await searchAlbumsAPIs(artistBand);

    this.setState({
      loading: false,
      returnAPI: true,
    });
  }

  render() {
    const { isEnterButtonDisabled, loading, returnAPI, artistBand } = this.state;

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
          && <p>
            `Resultado de álbuns de: $
            {artistBand}
            `
             </p>}
      </div>
    );
  }
}

export default Search;
