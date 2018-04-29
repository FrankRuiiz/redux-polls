import { savePollAnswer, savePoll } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const ADD_ANSWER = 'ADD_ANSWER';

// syncronous action creator that is just returning an object
function addAnswer({ authedUser, id, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    id,
    answer
  };
}

// because we are using an async request, we use redux thunk pattern
export function handleAddAnswer(answerData) {
  // because we call async savePollAnswer we want to return a functiona and pass it dispatch
  return dispatch => {
    dispatch(showLoading);
    return savePollAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()));
  };
}
