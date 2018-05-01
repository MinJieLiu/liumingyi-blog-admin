import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

const AuthorizedRoute = ({
  component: Component,
  render,
  authority,
  redirectPath = '/login',
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
  </Authorized>
);

AuthorizedRoute.propTypes = {
  component: PropTypes.element,
  render: PropTypes.func,
  authority: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

export default AuthorizedRoute;
