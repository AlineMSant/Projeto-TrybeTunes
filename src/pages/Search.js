import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnterButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const characters = 2;
    if (event.target.value.length >= characters) {
      this.setState({
        isEnterButtonDisabled: false,
      });
    } else {
      this.setState({
        isEnterButtonDisabled: true,
      });
    }
  }

  render() {
    const { isEnterButtonDisabled } = this.state;

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
      </div>
    );
  }
}

export default Search;
