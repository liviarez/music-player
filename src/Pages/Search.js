import React, { Component } from 'react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Pesquisar from '../components/Pesquisar';

class Searchs extends Component {
  state = {
    isButtonSearchDisable: true,
    name: '',
    albums: '',
    isLoading: false,
  };

  saveButton = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { name } = this.state;
      const albunsArtistas = await searchAlbumsAPI(name);
      this.setState({
        isLoading: false,
        albums: albunsArtistas,
      });
    });
  };

  validateSearchButton = ({ target }) => {
    const minimumCharacters = 2;
    const { name, value } = target;
    if (value.length >= minimumCharacters) {
      this.setState(() => ({
        [name]: value,
        isButtonSearchDisable: false,
      }));
    }
  };

  render() {
    const { isButtonSearchDisable, isLoading, albums, name } = this.state;
    return (
      isLoading ? <Loading /> : (
        <div data-testid="page-search">
          <form>
            <label>
              <input
                data-testid="search-artist-input"
                type="text"
                name="name"
                placeholder="O que você quer ouvir?"
                onChange={ this.validateSearchButton }
              />
              <button
                data-testid="search-artist-button"
                disabled={ isButtonSearchDisable }
                onClick={ this.saveButton }
              >
                Search
              </button>
              <p>
                Resultado de álbuns de:
                {' '}
                {name}
              </p>
            </label>
            {
              albums !== '' && (
                <div>
                  {albums.length !== 0
                    ? (
                      <div>
                        {albums.map((album) => (<Pesquisar
                          key={ album.collectionId }
                          id={ album.collectionId }
                          imagem={ album.artworkUrl100 }
                          name={ album.collectionName }
                        />))}
                      </div>
                    ) : (<p>Nenhum álbum foi encontrado</p>)}
                </div>)
            }
          </form>
        </div>
      )
    );
  }
}
export default Searchs;
