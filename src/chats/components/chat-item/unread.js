import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const StyledUnread = styled.span`
    font-size: 1.2rem;
    color: white;
    padding: 0 0.6rem;
    border-radius: 1.8rem;
    line-height: 1.8rem;
    font-weight: normal;
    text-align: center;
    background: #3fdaf2;
    display: inline-block;
`;

const Unread = ({unreadCount}) => {
    return <StyledUnread>{unreadCount}</StyledUnread>
};

Unread.propTypes = {
    unreadCount: PropTypes.number.isRequired
};

export default Unread;