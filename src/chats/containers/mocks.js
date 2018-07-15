import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postMessageFromRandomUser, postMessageFromTenLatest, postMessageFromUnknown } from '../../ducks/mocks'
import Button from '../components/button';

const Mocks = ({postMessageFromUnknown, postMessageFromTenLatest, postMessageFromRandomUser}) => (
  <div className="button-group">
    <Button onClick={postMessageFromUnknown}>
      Send from unknown
    </Button>
    <Button onClick={postMessageFromTenLatest}>
      Send from 10 latest
    </Button>
    <Button onClick={postMessageFromRandomUser}>
      Send a message by random user from the list
    </Button>
  </div>
);

Mocks.propTypes = {
  postMessageFromUnknown: PropTypes.func.isRequired,
  postMessageFromTenLatest: PropTypes.func.isRequired,
  postMessageFromRandomUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  postMessageFromUnknown,
  postMessageFromTenLatest,
  postMessageFromRandomUser,
};

export default connect(null, mapDispatchToProps)(Mocks);