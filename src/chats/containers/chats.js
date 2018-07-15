import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactList from 'react-list';

import {Chat} from "../components/chat-item/chat";
import {chatsLoadAction, getSortedChats, markAsReadAction} from '../../ducks/chats'
import {getCurrentUser, userLoadAction} from '../../ducks/user'

class Chats extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
        chats: PropTypes.array,
        markAsReadAction: PropTypes.func.isRequired,
        userLoadAction: PropTypes.func.isRequired,
        chatsLoadAction: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.chatsLoadAction();
        this.props.userLoadAction();
    }

    renderItem = (index) => {
        const {chats, user, markAsReadAction} = this.props;
        return (
            <Chat
                user={user}
                key={chats[index].id}
                chat={chats[index]}
                read={markAsReadAction}
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

const mapStateToProps = (state) => {
    return ({
        user: getCurrentUser(state),
        chats: getSortedChats(state),
    });
};

const mapDispatchToProps = (dispatch) => {
    return {
        markAsReadAction: (payload) => dispatch(markAsReadAction(payload)),
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        userLoadAction: () => dispatch(userLoadAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);