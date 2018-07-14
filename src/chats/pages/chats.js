import Layout from '../components/layout'
import ListWrap from '../components/list-wrap'
import Mocks from '../containers/mocks'
import Chats from '../containers/chats'
import React from 'react';

export const ChatsPage = () => {
  return (<Layout>
    <Mocks/>
    <ListWrap>
      <Chats/>
    </ListWrap>
  </Layout>);
};