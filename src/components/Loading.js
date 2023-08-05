import React from 'react';
import '../Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-album" className="loading-container">
        <span className="loader" />
        {/* <h1 className="loading-text">Carregando...</h1> */}
      </div>
    );
  }
}

export default Loading;
