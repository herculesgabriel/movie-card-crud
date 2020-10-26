import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';
import Button from '../styles/Button';

const Wrapper = styled.div`
  align-items: center;
  background-color: #55efc4;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;

  & ${Button} {
    align-self: flex-end;
  }
`;

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    movieAPI.getMovies().then((movies) => {
      this.setState({ movies });
    });
  }

  render() {
    const { movies } = this.state;

    if (movies.length === 0) return <Loading />;

    return (
      <Wrapper>
        <Button>
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        </Button>

        <div data-testid="movie-list">
          {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        </div>
      </Wrapper>
    );
  }
}

export default MovieList;
