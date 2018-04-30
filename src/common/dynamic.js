import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Spinner = styled(Spin)`
  width: 100%;
  margin: 40px 0 !important;
`;

const defaultLoadingComponent = () => <Spinner size="large" />;

function asyncComponent(config) {
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

export default config => asyncComponent({
  resolve: config.resolve || config.component,
  ...config,
});
