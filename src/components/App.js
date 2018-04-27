import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import LoadingBar from 'react-redux-loading';

import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Poll from './Poll';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <Poll match={{ params: {id: 'xj352vofupe1dqz9emx13r'} }} />}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
