import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import api from '../../api/chats';
import {Chat} from "../../components/chat/chat";
import './chats.scss';
import chatsService from '../../services/chats.service';
import {chatsUpdateAction, chatUpdateAction, newMessageAction, postMessageAction} from '../../actions/chats'
import {userUpdateAction} from '../../actions/user'
import {getChats} from "../../reducers/chats";
import {getCurrentUser} from "../../reducers/user";
import ReactList from 'react-list';

class Chats extends PureComponent {
    socket;
    markAsReadHandler = this.markAsRead.bind(this);

    constructor() {
        super();
    }

    componentDidMount() {
        this.socket = api.listenIncoming();
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.props.dispatch(newMessageAction(message));
        };
        this.props.loadUser().then(() => {
            return this.props.loadChats();
        });
    }

    markAsRead(chat) {
        if (chat.unreadMessagesCount > 0) {
            api.markAsReadChat(chat.id);
            const _chat = chatsService.markAsRead(chat);
            this.props.dispatch(chatUpdateAction(_chat))
        }
    }

    componentWillUnmount() {
        this.socket.close();
    }

    renderItem(index, key) {
        return <Chat user={this.props.user}
                     key={this.props.chats[index].id}
                     chat={this.props.chats[index]} read={this.markAsReadHandler}/>
    }


    render() {
        const {chats, user} = this.props;
        return (<div className="chats-layout">
                <div className="chats-layout__buttons">
                    <div className="button-group">
                        <button className="button-group__button"
                                onClick={() => this.props.postMessageFromUnknown(chats, user)}>
                            Send from unknown
                        </button>
                        <button className="button-group__button"
                                onClick={() => this.props.postMessageFromTenLatest(chats, user)}>
                            Send from 10 latest
                        </button>
                        <button className="button-group__button"
                                onClick={() => this.props.postMessageFromRandomUser(chats, user)}>
                            Send a message by random user from the list
                        </button>
                    </div>
                </div>
                <div className="chats-layout__chats">
                    <div style={{overflow: 'auto', maxHeight: 400}}>
                        <ReactList
                            itemRenderer={this.renderItem.bind(this)}
                            length={this.props.chats.length}
                        />
                    </div>
                    {(chats || []).map((chat) => {
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const chats = getChats(state);
    const user = getCurrentUser(state);
    return {
        user,
        chats
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        postMessageFromUnknown: (chats, user) => {
            let message = chatsService.getMessageFromUnknownUser(chats, user);
            message.timestamp = Date.now();
            dispatch(postMessageAction(message));
        },
        postMessageFromTenLatest: (chats, user) => {
            const chat = chats.slice(0, 10)[chatsService.getRandomInt(0, 9)];
            const sender = chat.participants.find((x) => x.id !== user.id);
            const message = chatsService.getMockMessage(chat.id, user.id, sender);
            message.timestamp = Date.now();
            dispatch(postMessageAction(message));
        },
        postMessageFromRandomUser: (chats, user) => {
            const chat = chats[chatsService.getRandomInt(0, chats.length - 1)];
            const sender = chat.participants.find((x) => x.id !== user.id);
            const message = chatsService.getMockMessage(chat.id, user.id, sender);
            message.timestamp = Date.now();
            dispatch(postMessageAction(message));
        },
        loadUser:
            () => {
                return api.getUser().then((data) => {
                    return dispatch(userUpdateAction(data));
                })
            },
        loadChats:
            () => {
                return api.loadChats().then((data) => {
                    dispatch(chatsUpdateAction(data))
                }).catch(() => {
                    dispatch(chatsUpdateAction([]))
                })
            }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);