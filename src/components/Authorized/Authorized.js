import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import checkPermissions from './checkPermissions';
import { MY_PERMISSIONS } from '../../services/profile';

const Authorized = ({
  authority,
  children,
  noMatch = null,
}) => (
  <ApolloConsumer>
    {cache => checkPermissions(
      cache.readQuery({ query: MY_PERMISSIONS }).profile.menus.map(n => n.permission),
      authority,
      children,
      noMatch,
    )}
  </ApolloConsumer>
);

Authorized.propTypes = {
  authority: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  noMatch: PropTypes.node,
};

export default Authorized;
