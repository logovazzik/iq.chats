import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {ChatsPage} from "./chats/pages/chats";
import { initSocket, closeSocket } from './ducks/socket/socket'

class App extends Component {
  static propTypes = {
    initSocket: PropTypes.func.isRequired,
    closeSocket: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.initSocket()
  }

  componentWillUnmount() {
    this.props.closeSocket();
  }

  render() {
    return (
     <ChatsPage/>
    );
  }
};

const mapDispatchToProps = {
    initSocket,
    closeSocket,
};

export default connect(null, mapDispatchToProps)(App);