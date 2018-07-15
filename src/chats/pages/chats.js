import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Layout from '../components/layout'
import ListWrap from '../components/list-wrap'
import Mocks from '../containers/mocks'
import Chats from '../containers/chats'
import { API_SOCKET_URL } from "../constants";

import { closeSocketConnection, openSocketConnection } from "../../ducks/socket";

export class ChatsPage extends PureComponent {
  static propTypes = {
    openSocketConnection: PropTypes.func.isRequired,
    closeSocketConnection: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.openSocketConnection(API_SOCKET_URL)
  }

  componentWillUnmount() {
    this.props.closeSocketConnection(API_SOCKET_URL);
  }

  render() {
    return (<Layout>
      <Mocks/>
      <ListWrap>
        <Chats/>
      </ListWrap>
    </Layout>);
  }
}


const mapDispatchToProps = {
  openSocketConnection,
  closeSocketConnection
};
export default connect(null, mapDispatchToProps)(Chats);
