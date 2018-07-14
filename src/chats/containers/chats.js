import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactList from 'react-list';

import { Chat } from "../components/chat/chat";
import { getSortedChats, loadChats, markAsRead } from '../../ducks/chats'
import { getCurrentUser, loadUser } from '../../ducks/user'

export class Chats extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    chats: PropTypes.array.isRequired,
    markAsRead: PropTypes.func.isRequired,
  };
  static defaultProps = {
    chats: [],
    user: {}
  };

  componentDidMount() {
    this.props.loadChats();
    this.props.loadUser();

  }


  renderItem = (index) => {
    const {chats, user = {}, markAsRead} = this.props;
    return (
      <Chat
        user={user}
        key={chats[index].id}
        chat={chats[index]}
        read={markAsRead}
      />
    );
  };

  render() {
    const {chats, user} = this.props;
    return (user && chats &&
      <ReactList
        itemRenderer={this.renderItem}
        length={chats.length}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: getCurrentUser(state),
  chats: getSortedChats(state),
});

const mapDispatchToProps = {
  markAsRead,
  loadChats,
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);