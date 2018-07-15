import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {ChatsPage} from "./chats/pages/chats";
import { initSocket, closeSocket } from './ducks/socket'

class App extends Component {


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