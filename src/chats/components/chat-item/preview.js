import React, {PureComponent} from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

import UnreadCount from './unread';
import {PREVIEW_MAX_LENGTH, SELF_MESSAGE_PREFIX} from "../../constants";

const StyledMessagePreview = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    font-size: 1.4rem;
    margin-right: 1rem;
    line-height: 1.8rem;
    font-weight: 300;
`;

const StyledPreview = styled.div`
    justify-content: space-between;
    display: flex;
`;

export default class Preview extends PureComponent {
    static propTypes = {
        preview: PropTypes.string.isRequired,
        unreadCount: PropTypes.number.isRequired
    };

    render() {
        const {unreadCount, preview} = this.props;

        return <StyledPreview>
            <StyledMessagePreview>{preview}</StyledMessagePreview>
            {unreadCount > 0 && <UnreadCount unreadCount={unreadCount}/>}
        </StyledPreview>
    }
}


