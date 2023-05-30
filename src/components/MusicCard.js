import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Pages/Loading';

export default class MusicCard extends Component {
  // Criar input checkbox data-testid={`checkbox-music-${trackId}`} DONE
  // Chamar API para adicionar musica addSOng
  state = {
    isFavorite: false,
    isLoading: false,

  };

  async componentDidMount() {
    const { trackId } = this.props;
    const callFavoriteSongAPI = await getFavoriteSongs();
    this.setState({
      // hof: some - boolean
      isFavorite: callFavoriteSongAPI.some((favorites) => favorites.trackId === trackId),
    });
  }

  isFavoriteChecked = async ({ target }) => {
    this.setState({
      isLoading: true,
      isFavorite: target,
    });
    const { song } = this.state;
    await addSong(song);

    this.setState({
      isLoading: false,
    });
  };

  // API recebe Objeto do mesmo formato que recebe do getMusic
  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isFavorite } = this.state;
    if (isLoading) { return <Loading />; }
    return (
      <div>
        <label>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            onChange={ this.isFavoriteChecked }
            checked={ isFavorite }
          />
          Favorita
        </label>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,

};
