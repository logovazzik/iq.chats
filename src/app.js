import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Layout from './components/layout'
import ListWrap from './components/list-wrap'
import Mocks from './containers/mocks'
import Chats from './containers/chats'
import { initSocket, closeSocket } from './redux/modules/socket'

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
      <Layout>
        <Mocks />
        <ListWrap>
          <Chats />
        </ListWrap>
      </Layout>
    );
  }
};

const mapDispatchToProps = {
    initSocket,
    closeSocket,
};

export default connect(null, mapDispatchToProps)(App);