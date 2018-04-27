import React, { Component } from 'react';
import { connect } from 'react-redux';

class Poll extends Component {
    render() {
        return (
            <div className='poll-container'>
                {JSON.stringify(this.props)}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, polls, users }, { match }) {
    const { id } = match.params;
    const poll = polls[id];

    if (!poll) {
        return {
            poll: null
        }
    }
    // goal is to reduce vote down to a single value (a, b, c or d)
    const vote = ['aVotes', 'bVotes', 'cVotes', 'dVotes'].reduce((vote, key) => {
        if (vote != null) { // we have already found out which option user has voted for
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
        authorAvatar: users[poll.author].avatarUrl
    }
}

export default connect(mapStateToProps)(Poll);