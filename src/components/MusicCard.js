import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackArray, previewArray } = this.props;
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
        </div>))

    );
  }
}

MusicCard.propTypes = {
  trackArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  previewArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
