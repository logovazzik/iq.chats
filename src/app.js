import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {ChatsPage} from "./chats/pages/chats";

export default class App extends Component {
  render() {
    return (
     <ChatsPage/>
    );
  }
};

