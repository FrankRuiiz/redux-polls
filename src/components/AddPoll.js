import React, { Component } from 'react';

class AddPoll extends Component {
  state = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: ''
  };
  render() {
    return <form className="add-form" />;
  }
}

export default AddPoll;
