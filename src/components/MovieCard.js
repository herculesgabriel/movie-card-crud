import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../styles/Button';

const MovieCardWrapper = styled.div`
  background-color: #74b9ff;
  border-radius: 8px;
  padding: 8px 0;
  margin: 15px 0;
`;

class MovieCard extends React.Component {
  render() {
    const {
      title,
      storyline,
      id,
    } = this.props.movie;

    return (
      <MovieCardWrapper data-testid="movie-card">
        <h1>{title}</h1>
        <p>{storyline}</p>

        <Button>
          <Link to={`/movies/${id}`}>
            VER DETALHES
        </Link>
        </Button>
      </MovieCardWrapper>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
