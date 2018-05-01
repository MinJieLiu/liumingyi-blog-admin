import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Query } from 'react-apollo';
import menuData from '../common/menu';
import routeData from '../common/route';
import pkg from '../../package.json';
import { MY_PROFILE } from '../services/profile';

const { Header, Sider, Content, Footer } = Layout;

export default class BasicLayout extends React.PureComponent {

  render() {
    return (
      <Query query={MY_PROFILE}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Layout>
              <Sider
                trigger={null}
                collapsible
              >
                <div>菜单</div>
              </Sider>
              <Layout>
                <Header />
                <Content>
                  <div>Hi {data.profile.username}.</div>
                  <Footer>
                    {pkg.description}
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          );
        }}
      </Query>
    );
  }
}
