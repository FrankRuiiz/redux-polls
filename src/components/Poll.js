import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPercentage } from '../utils/helpers';
import { handleAddAnswer } from '../actions/answers';

const getVoteKeys = () => ['aVotes', 'bVotes', 'cVotes', 'dVotes'];

class Poll extends Component {
  handleAnswer = answer => {
    const { poll, authedUser } = this.props;
    this.answered = true;

    // dispatch action
    this.props.dispatch(
      handleAddAnswer({
        authedUser,
        answer,
        id: poll.id
      })
    );
  };
  render() {
    if (this.props.poll === null) {
      return <p>This poll does not exist.</p>;
    }

    const { poll, vote, authedUser, authorAvatar } = this.props;

    const totalVotes = getVoteKeys().reduce(
      (total, key) => total + poll[key].length,
      0
    );

    return (
      <div className="poll-container">
        <h1 className="question">{poll.question}</h1>
        <div className="poll-author">
          By: <img src={authorAvatar} alt="Author's avatar" />
        </div>
        <ul>
          {['aText', 'bText', 'cText', 'dText'].map(key => {
            const count = poll[key[0] + 'Votes'].length;

            return (
              <li
                key={key}
                onClick={() => {
                  if (vote === null && !this.answered) {
                    this.handleAnswer(key[0]);
                  }
                }}
                className={`option ${vote === key[0] ? 'chosen' : ''}`}
              >
                {vote === null ? (
                  poll[key]
                ) : (
                  <div className="result">
                    <span>{poll[key]}</span>
                    <span>
                      {getPercentage(count, totalVotes)}% ({count})
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, polls, users }, { match }) {
  const { id } = match.params;
  const poll = polls[id];

  if (!poll) {
    return {
      poll: null
    };
  }
  // goal is to reduce vote down to a single value (a, b, c or d)
  const vote = getVoteKeys().reduce((vote, key) => {
    if (vote != null) {
      // we have already found out which option user has voted for
      return vote[0]; // vote[0] will return the first letter (a, b, c, d)
    }
    // if poll['a/b/c/dVotes'] contains the authedUser, return that key
    // otherwise return vote (null)
    return poll[key].includes(authedUser) ? key : vote;
  }, null);

  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL
  };
}

export default connect(mapStateToProps)(Poll);
