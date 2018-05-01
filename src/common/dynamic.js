import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styled from 'styled-components';

const Spinner = styled(Spin)`
  width: 100%;
  margin: 40px 0 !important;
`;

const defaultLoadingComponent = () => <Spinner size="large" />;

function getAsyncComponent(config) {
  const { resolve } = config;

  return class DynamicComponent extends React.Component {
    constructor(...args) {
      super(...args);
      this.LoadingComponent =
        config.LoadingComponent || defaultLoadingComponent;
      this.state = {
        AsyncComponent: null,
      };
      this.load();
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    load() {
      resolve().then((m) => {
        const AsyncComponent = m.default || m;
        if (this.mounted) {
          this.setState({ AsyncComponent });
        } else {
          this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
        }
      });
    }

    render() {
      const { AsyncComponent } = this.state;
      const { LoadingComponent } = this;
      if (AsyncComponent) return <AsyncComponent {...this.props} />;

      return <LoadingComponent {...this.props} />;
    }
  };
}

export const AsyncComponent = ({ component, ...props }) => {
  const Component = getAsyncComponent({
    resolve: component,
  });
  return <Component {...props} />;
};

AsyncComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default config => getAsyncComponent({
  resolve: config.resolve || config.component,
  ...config,
});
