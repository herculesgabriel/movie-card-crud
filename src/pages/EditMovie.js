import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loading, MovieForm } from '../components';
import Wrapper from '../styles/Wrapper';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      movie: {},
      shouldRedirect: false,
      status: 'loading',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    movieAPI.getMovie(id).then((movie) => {
      this.setState({ movie }, () => {
        this.setState({ status: 'loaded' });
      });
    });
  }

  componentDidUpdate() {
    if (this.state.shouldRedirect) {
      const { history } = this.props;
      history.push('/');
    }
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie).then((response) => {
      if (response === 'OK') {
        this.setState({ shouldRedirect: true });
      }
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;

    if (shouldRedirect) {
      return <Loading />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <Wrapper data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </Wrapper>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditMovie;
