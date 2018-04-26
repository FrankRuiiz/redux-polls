import { savePoll } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLL = 'ADD_POLL';

function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll
  }
}

export function handleAddPoll (poll) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    // show loading before invoking async function
    dispatch(showLoading());

    // first we save poll to the database (fake database in this case)
    return savePoll({
      ...poll,
      author: authedUser
    })
    .then((poll) => dispatch(addPoll(poll))) // then we dispatch
    .then(() => dispatch(hideLoading())); 
  }
}

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls
  };
}
