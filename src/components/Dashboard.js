import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  state = {
    showAnswered: false
  };
  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }));
  };
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }));
  };
  render() {
    const { showAnswered } = this.state;
    const { answered, unanswered } = this.props;

    const list = showAnswered === true ? answered : unanswered;
    console.log('list', list);
    return (
      <div>
        <div className="dashboard-toggle">
          <button
            style={{
              textDecoration: showAnswered === false ? 'underline' : null
            }}
            onClick={this.showUnanswered}
          >
            Unanswerd
          </button>
          <span> | </span>
          <button
            style={{
              textDecoration: showAnswered === true ? 'underline' : null
            }}
            onClick={this.showAnswered}
          >
            Answerd
          </button>
        </div>
        <ul className="dashboard-list">
          {list.map(poll => <li key={poll.id}>{poll.question}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, polls, users }) {
  // gets answer id's from the authed user
  const answers = users[authedUser].answers;

  const answered = answers
    .map(id => polls[id]) // maps over ansered and references polls
    .sort((a, b) => b.timestamp - a.timestamp); // sorts by timestamp

  const unanswered = Object.keys(polls) // returns an array of polls
    .filter(id => !answers.includes(id)) // if specific id of poll is not included in answers array
    .map(id => polls[id]) // maps over ansered and references polls
    .sort((a, b) => b.timestamp - a.timestamp); // sorts by timestamp

  // return answered and unanswerd polls
  return {
    answered,
    unanswered
  };
}

export default connect(mapStateToProps)(Dashboard);
