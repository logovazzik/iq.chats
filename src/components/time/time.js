import React, { PureComponent } from 'react';
import { getDateObj, isToday } from '../../utils'

export default class Time extends PureComponent {
  getFormattedTime(timestamp) {
    const messageDate = new Date(timestamp);
    const dateObj = getDateObj(messageDate);
    const timeStr = `${dateObj.hours}:${dateObj.minutes}`;

    return !isToday(messageDate) ?
      `${dateObj.day}.${dateObj.month}.${dateObj.year} ${timeStr}` :
      timeStr;
  }

  render() {
    return this.getFormattedTime(this.props.timestamp);
  }
}