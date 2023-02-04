import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistBandName: '',
      album: '',
      trackNameArray: [],
      previewUrlArray: [],
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

    console.log(arrayAlbum);

    this.setState({
      artistBandName: { artistName },
      album: collectionName,
    });

    for (let i = 1; i < arrayAlbum.length; i += 1) {
      this.setState((prevState) => ({
        trackNameArray: [...prevState.trackNameArray, arrayAlbum[i].trackName],
        previewUrlArray: [...prevState.previewUrlArray, arrayAlbum[i].previewUrl],
      }));
    }
  }

  render() {
    const { artistBandName, album, trackNameArray, previewUrlArray } = this.state;
    const name = artistBandName.artistName;

    console.log(trackNameArray);
    console.log(previewUrlArray);

    return (
      <div data-testid="page-album">
        <h1>Album</h1>
        <h2 data-testid="artist-name">{ name }</h2>
        <h3 data-testid="album-name">{ album }</h3>
        <MusicCard trackArray={ trackNameArray } previewArray={ previewUrlArray } />
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
