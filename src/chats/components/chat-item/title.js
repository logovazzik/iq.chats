import React, {PureComponent} from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';

import Time from './time';

const StyledTitle = styled.h5`
    margin-bottom: 0.4rem;
    margin-top:0;
    display: flex;
    font-weight: 500;
    font-size: 1.5rem;
    white-space: nowrap;
    justify-content: space-between;
`;

const StyledChatName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0;
`;

const StyledChatTime = styled.span`
    font-size: 1.2rem;
    font-weight: 300;
`;

export default class Title extends PureComponent {
    static propTypes = {
        timestamp: PropTypes.number,
        title: PropTypes.string.isRequired
    };

    render() {
        const {title, timestamp} = this.props;

        return <StyledTitle>
            <StyledChatName>{title}</StyledChatName>
            {
                timestamp > 0 &&
                <StyledChatTime>
                    <Time timestamp={timestamp}/>
                </StyledChatTime>
            }
        </StyledTitle>
    }
}


