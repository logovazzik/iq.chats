import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import {color, intToRGB} from "../../../utils";

export default class Avatar extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired
    };

    getStyledAvatar = (number) => {
        return styled.div`
          line-height: 4.6rem;
          width: 4.6rem;
          text-align: center;
          border-radius: 50%;
          color: white;
          background: ${this.getBackground(number)}
        `;
    };

    getBackground = (number) => {
        const firstColor = intToRGB(number);
        const secondColor = color(firstColor, false, 120);
        return `linear-gradient(to bottom right, rgba(${firstColor.join(',')},1), rgba(${secondColor.join(',')},1))`
    };

    render() {
        const {text, number} = this.props;
        const StyledAvatar = this.getStyledAvatar(number);

        return <StyledAvatar>{text}</StyledAvatar>
    }
}