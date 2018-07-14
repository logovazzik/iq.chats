import React, { PureComponent } from 'react';
import './avatar.scss';
import { color, intToRGB } from "../../../utils";

export default class Avatar extends PureComponent {
  getBackground = (number) => {
    const firstColor = intToRGB(number);
    const secondColor = color(firstColor, false, 120);
    return {
      'background': `linear-gradient(to bottom right, rgba(${firstColor.join(',')},1), rgba(${secondColor.join(',')},1))`
    }
  };

  render() {
    const {text, number} = this.props;
    return <div
      style={this.getBackground(number)}
      className="avatar">
      {text}
    </div>
  }
}