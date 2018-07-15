import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from '../components/button';
import {getSortedChats, postMessageAction} from "../../ducks/chats";
import {getCurrentUser} from "../../ducks/user";
import mockChatsService from '../../services/chats.mocks';

class Mocks extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
        chats: PropTypes.array.isRequired,
        postMessageAction: PropTypes.func.isRequired,
    };

    postMessageFromUnknown = () => {
        const {chats, user} = this.props;
        this.postMessage(mockChatsService.getMessageFromUnknown(chats, user));
    };

    postMessageFromTenLatest = () => {
        const {chats, user} = this.props;
        this.postMessage(mockChatsService.getMessageFromTenLatest(chats, user));
    };

    postMessageFromRandomUser = () => {
        const {chats, user} = this.props;
        this.postMessage(mockChatsService.getMessageFromRandomUser(chats, user));
    };

    postMessage(message) {
        this.props.postMessageAction(message);
    }

    render() {
        return (<div>
            <Button onClick={this.postMessageFromUnknown}>
                Send from unknown
            </Button>
            <Button onClick={this.postMessageFromTenLatest}>
                Send from 10 latest
            </Button>
            <Button onClick={this.postMessageFromRandomUser}>
                Send a message by random user from the list
            </Button>
        </div>);
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
        postMessageAction: (payload) => dispatch(postMessageAction(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mocks);