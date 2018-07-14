import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactList from 'react-list';

import { Chat } from "../components/chat/chat";
import { markAsRead, getSortedChats } from '../redux/modules/chats'
import { getCurrentUser } from '../redux/modules/user'

const Chats = ({ user, chats, markAsRead }) => {
  const renderItem = (index, key)  => (
    <Chat 
      user={user}
      key={chats[index].id}
      chat={chats[index]} 
      read={markAsRead}
    />
  );
  
  return (
    <ReactList
      itemRenderer={renderItem}
      length={chats.length}
    />
  );
};

Chats.propTypes = {
  user: PropTypes.object,
  chats: PropTypes.array.isRequired,
  markAsRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: getCurrentUser(state),
    chats: getSortedChats(state),
});

const mapDispatchToProps = {
    markAsRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);