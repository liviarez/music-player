import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Pesquisar extends Component {
  render() {
    const { imagem, name, id } = this.props;
    return (
      <div>
        <img src={ imagem } alt="" />
        <p>{name}</p>
        <Link
          to={ `/album/${id}` }
          data-testid={ `link-to-album-${id}` }
        />
      </div>
    );
  }
}
Pesquisar.propTypes = {
  imagem: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default Pesquisar;
