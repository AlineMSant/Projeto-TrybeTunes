import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favSong: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.setState({
      favSong: await getFavoriteSongs(), // retorna array com todas as musicas favoritas no LocalStorage
    });
  }

  async handleChange(event) {
    const { albumWhithoutIndexZero } = this.props;

    this.setState({
      loading: true,
    });

    await addSong(albumWhithoutIndexZero[event.target.tabIndex]); // manda musica favorita para LocalStorage
    // console.log(albumWhithoutIndexZero[event.target.tabIndex]);

    const fetchGetFavorite = await getFavoriteSongs(); // retorna array com todas as musicas favoritas no LocalStorage

    this.setState({
      favSong: fetchGetFavorite,
      loading: false,
    });
  }

  render() {
    const { trackArray,
      previewArray,
      trackIdArray,
      albumWhithoutIndexZero } = this.props;

    const { loading, favSong } = this.state;

    // console.log(favSong);
    // console.log(trackIdArray);
    // console.log(checkdArray);

    if (loading === true) return <Loading />;
    return (
      trackArray.map((trackName, index) => (
        <div key={ index }>
          {' '}
          { trackName }
          <audio data-testid="audio-component" src={ previewArray[index] } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>

          <label
            htmlFor="check-favorite"
            data-testid={ `checkbox-music-${trackIdArray[index]}` }
          >
            Favorita
            <input
              id="check-favorite"
              type="checkbox"
              tabIndex={ index }
              value={ albumWhithoutIndexZero[index] }
              onChange={ this.handleChange }
              checked={ favSong.some((song) => song.trackId === trackIdArray[index]) }
            />
          </label>
        </div>))

    );
  }
}

MusicCard.propTypes = {
  trackArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  previewArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  trackIdArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  albumWhithoutIndexZero: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
      artistName: PropTypes.string.isRequired,
      artistViewUrl: PropTypes.string.isRequired,
      artworkUrl30: PropTypes.string.isRequired,
      artworkUrl60: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      collectionCensoredName: PropTypes.string.isRequired,
      collectionExplicitness: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      collectionPrice: PropTypes.number.isRequired,
      collectionViewUrl: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      discCount: PropTypes.number.isRequired,
      discNumber: PropTypes.number.isRequired,
      isStreamable: PropTypes.bool.isRequired,
      kind: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
      primaryGenreName: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackCensoredName: PropTypes.string.isRequired,
      trackCount: PropTypes.number.isRequired,
      trackExplicitness: PropTypes.string.isRequired,
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      trackNumber: PropTypes.number.isRequired,
      trackPrice: PropTypes.number.isRequired,
      trackTimeMillis: PropTypes.number.isRequired,
      trackViewUrl: PropTypes.string.isRequired,
      wrapperType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MusicCard;
