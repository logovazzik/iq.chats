import React, {PureComponent} from 'react';
import './chat.scss';
import {CHAT_TYPES, SELF_MESSAGE_PREFIX, PREVIEW_MAX_LENGTH} from "../../constants";
import chatsService from '../../services/chats.service'

export class Chat extends PureComponent {
    constructor(props) {
        super(props);
        this.previewSymbolsMax = PREVIEW_MAX_LENGTH;
    }

    getPreview(message) {
        return message.substring(0, this.previewSymbolsMax);
    }

    getFormattedTime(timestamp) {
        const messageDate = new Date(timestamp);
        const dateObj = chatsService.getDateObj(messageDate);
        const timeStr = `${dateObj.hours}:${dateObj.minutes}`;

        return !chatsService.isToday(messageDate) ?
            `${dateObj.day}.${dateObj.month}.${dateObj.year} ${timeStr}` :
            timeStr;
    }

    getTitle() {
        const {chat, user} = this.props;
        if (chat.type === CHAT_TYPES.User2User) {
            return chat.participants.find((participant) => {
                return participant.id !== user.id;
            }).name;
        }
        // todo add support for group chats
    }

    render() {
        const {chat, user, read} = this.props;
        const lastMessage = chat.messages[chat.messages.length - 1];
        return (<div className="chat" onClick={() => read(chat)}>
            <h5 className="chat__title"><span>{this.getTitle()}</span>
                {lastMessage && <span className="chat__time">{this.getFormattedTime(lastMessage.timestamp)}</span>}
            </h5>
            {lastMessage &&
            <div className="chat__preview">
                <span
                    className="chat__text">{lastMessage.sender.id === user.id && SELF_MESSAGE_PREFIX + ' '}{this.getPreview(lastMessage.text)}</span>
                {chat.unreadMessagesCount > 0 && <span className="chat__unread">{chat.unreadMessagesCount}</span>}</div>
            }
        </div>);
    }
}