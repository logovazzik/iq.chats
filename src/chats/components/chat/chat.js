import React, { PureComponent } from 'react';
import './chat.scss';
import { CHAT_TYPES, PREVIEW_MAX_LENGTH, SELF_MESSAGE_PREFIX } from "../../constants";
import Time from '../time/time';
import Avatar from "../avatar/avatar";

export class Chat extends PureComponent {
  constructor(props) {
    super(props);
    this.previewSymbolsMax = PREVIEW_MAX_LENGTH;
  }

  getPreview(message) {
    return message.substring(0, this.previewSymbolsMax);
  }

  getOpponent(chat, user) {
    return chat.participants.find((participant) => {
      return participant.id !== user.id;
    })
  }

  getAbbr(chat, user) {
    if (chat.type === CHAT_TYPES.User2User) {
      const opponent = this.getOpponent(chat, user);
      return opponent.firstName[0] + opponent.lastName[0];
    }
  }

  getNumberForAvatar(chat, user) {
    if (chat.type === CHAT_TYPES.User2User) {
      const opponent = this.getOpponent(chat, user);
      return opponent.id;
    }
    return chat.id;
  }

  getTitle(chat, user) {
    if (chat.type === CHAT_TYPES.User2User) {
      const opponent = this.getOpponent(chat, user);
      return `${opponent.firstName} ${opponent.lastName}`;
    }
    return chat.title;
  }

  getMessagePreview(message, user) {
    const prefix = message.sender.id === user.id ? SELF_MESSAGE_PREFIX : '';
    return `${prefix} ${this.getPreview(message.text)}`;
  }

  render() {
    const {chat, user, read} = this.props;
    const lastMessage = chat.messages[chat.messages.length - 1];
    return (<div className="chat"
                 style={this.props.style}
                 onClick={() => read(chat)}>
      <div className="chat__part chat__part_l">
        <Avatar text={this.getAbbr(chat, user)}
                number={this.getNumberForAvatar(chat, user) + 100000}/>
      </div>
      <div className="chat__part">
        <h5 className="chat__title">
          <span>{this.getTitle(chat, user)}</span>
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