import React, { PureComponent } from 'react';
import './chat.scss';
import { PREVIEW_MAX_LENGTH, SELF_MESSAGE_PREFIX } from "../../constants";
import Time from '../time';
import Avatar from "../avatar/avatar";
import chatsService from '../../services/chats';

export class Chat extends PureComponent {
  previewSymbolsMax = PREVIEW_MAX_LENGTH;

  getPreview(message) {
    return message.substring(0, this.previewSymbolsMax);
  }

  getChatOpponent(chat, user) {
    return chatsService.getChatFirstOpponent(chat, user);
  }

  getAbbr(chat, user) {
    return chatsService.getAbbreviation(chat, user);
  }

  getNumberForAvatar(chat, user) {
    return chatsService.getChatColorNumber(chat, user);
  }

  getChatName(chat, user) {
    return chatsService.getChatTitle(chat, user);
  }

  getMessagePreview(message, user) {
    const prefix = message.sender.id === user.id ? SELF_MESSAGE_PREFIX : '';
    return `${prefix} ${this.getPreview(message.text)}`;
  }

  readHandler = () => this.props.read(this.props.chat);

  render() {
    const {chat, user} = this.props;
    const lastMessage = chat.messages[chat.messages.length - 1];
    return (<div className="chat"
                 style={this.props.style}
                 onClick={this.readHandler}>
      <div className="chat__part chat__part_l">
        <Avatar text={this.getAbbr(chat, user)}
                number={this.getNumberForAvatar(chat, user)}/>
      </div>
      <div className="chat__part">
        <h5 className="chat__title">
          <span className="chat__name">{this.getChatName(chat, user)}</span>
          {lastMessage && <span className="chat__time">
            <Time timestamp={lastMessage.timestamp}/></span>
          }
        </h5>
        {lastMessage &&
        <div className="chat__preview">
          <span className="chat__text">{this.getMessagePreview(lastMessage, user)}</span>
          {chat.unreadMessagesCount > 0 && <span className="chat__unread">{chat.unreadMessagesCount}</span>}</div>
        }
      </div>
    </div>);
  }
}