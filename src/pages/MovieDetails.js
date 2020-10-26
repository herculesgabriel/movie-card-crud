import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

import Button from '../styles/Button';

const MovieDetailsWrapper = styled.div`
  align-items: center;
  background-color: #55efc4;
  display: flex;
  flex-direction: column;
  padding: 20px;

  & ${'img'} {
    border-radius: 12px;
  }
`;

const MovieInfoWrapper = styled.div`
  background-color: #0984e3;
  border-radius: 8px;
  margin: 15px 0;
  padding: 8px 0;

  & ${'h1'} {
    color: white;
    font-size: 18px;
  }
`;
class MovieDetails extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      movie: {},
      loading: true,
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    movieAPI.getMovie(id).then((movie) => {
      this.setState({ movie }, () => {
        this.setState({ loading: false });
      });
    });
  }

  componentDidUpdate() {
    if (this.state.shouldRedirect) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleDelete(event) {
    event.preventDefault();

    const { id } = this.props.match.params;
    movieAPI.deleteMovie(id).then((response) => {
      if (response.status === 'OK') {
        this.setState({ shouldRedirect: true });
      }
    });
  }

  render() {
    const { loading } = this.state;

    if (loading) return <Loading />;

    const { title, storyline, imagePath, genre, rating, subtitle } = this.state.movie;

    return (
      <MovieDetailsWrapper data-testid="movie-details">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <MovieInfoWrapper>
          <h1>TITLE</h1>
          <p>{`${title}`}</p>
          <h1>SUBTITLE</h1>
          <p>{`Subtitle: ${subtitle}`}</p>
          <h1>STORYLINE</h1>
          <p>{`Storyline: ${storyline}`}</p>
          <h1>GENRE</h1>
          <p>{`Genre: ${genre}`}</p>
          <h1>RATING</h1>
          <p>{`Rating: ${rating}`}</p>
        </MovieInfoWrapper>

        <div>
          <Button>
            <Link to="/">VOLTAR</Link>
          </Button>

          <Button>
            <Link to={`/movies/${this.props.match.params.id}/edit`}>EDITAR</Link>
          </Button>

          <Button>
            <a href="/" onClick={this.handleDelete}>DELETAR</a>
          </Button>
        </div>

      </MovieDetailsWrapper>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MovieDetails;
