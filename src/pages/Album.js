import React from 'react';
import PropTypes, { array } from 'prop-types';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistBandName: '',
      album: '',
    };

    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { match: { params: { id } } } = this.props;
    const arrayAlbum = await getMusics(id);
    const { artistName, collectionName } = arrayAlbum[0];

    this.setState({
      artistBandName: { artistName },
      album: collectionName,
    });
  }

  render() {
    const { artistBandName, album } = this.state;
    const name = artistBandName.artistName;
    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <h2 data-testid="artist-name">{ name }</h2>
        <h3 data-testid="album-name">{ album }</h3>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
