import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import chatsService from '../../services/chats';
import Avatar from "./avatar";
import Title from './title';
import Preview from './preview';
import {PREVIEW_MAX_LENGTH, SELF_MESSAGE_PREFIX} from "../../constants";

const StyledChatPart = styled.div`
    vertical-align: middle;
    display: table-cell;
`;
const StyledChatPartLeft = StyledChatPart.extend`
    width: 60px;
`;
const StyledChat = styled.div`
  text-align: left;
  cursor: pointer;
  height: 60px;
  overflow: hidden;
  padding: 1rem 1.5rem;
  border-bottom: solid 1px #d3f3f5;
  display: table;
  table-layout: fixed;
  width: 100%;
`;


export class Chat extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
        chat: PropTypes.object.isRequired
    };

    previewSymbolsMax = PREVIEW_MAX_LENGTH;

    getChatOpponent(chat, user) {
        return chatsService.getChatFirstOpponent(chat, user);
    }

    getAbbr(chat, user) {
        return chatsService.getAbbreviation(chat, user);
    }

    getChatName(chat, user) {
        return chatsService.getChatTitle(chat, user);
    }

    getNumberForAvatar(chat, user) {
        return chatsService.getChatColorNumber(chat, user);
    }

    getPreview(message) {
        return message.substring(0, this.previewSymbolsMax);
    }

    getMessagePreview(message, user) {
        const prefix = message.sender.id === user.id ? SELF_MESSAGE_PREFIX : '';
        return `${prefix} ${this.getPreview(message.text)}`;
    }

    readHandler = () => this.props.read(this.props.chat);

    render() {
        const {chat, user} = this.props;
        const lastMessage = chat.messages[chat.messages.length - 1];
        return (<StyledChat
            onClick={this.readHandler}>
            <StyledChatPartLeft>
                <Avatar text={this.getAbbr(chat, user)}
                        number={this.getNumberForAvatar(chat, user)}/>
            </StyledChatPartLeft>
            <StyledChatPart>
                <Title title={this.getChatName(chat, user)}
                       timestamp={lastMessage ? lastMessage.timestamp : null}/>
                {lastMessage && <Preview preview={this.getMessagePreview(lastMessage, user)}
                                         unreadCount={chat.unreadMessagesCount}/>}
            </StyledChatPart>
        </StyledChat>);
    }
}