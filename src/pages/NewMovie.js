import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieForm from '../components/MovieForm';
import Wrapper from '../styles/Wrapper';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit(newMovie) {
    movieAPI.createMovie(newMovie).then((response) => {
      if (response === 'OK') {
        this.setState({ shouldRedirect: true });
      }
    });
  }

  render() {
    return (
      <Wrapper data-testid="new-movie">
        <MovieForm onSubmit={this.handleSubmit} />
      </Wrapper>
    );
  }
}

NewMovie.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default NewMovie;
