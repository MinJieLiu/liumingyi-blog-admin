import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';
import DocumentTitle from 'react-document-title';
import { Query, Mutation } from 'react-apollo';
import menuData from '../common/menu';
import routeData from '../common/route';
import pkg from '../../package.json';
import { MY_PROFILE } from '../services/profile';
import { GET_APP } from '../services/app';
import Header from '../components/Header';
import QueryFilter from '../components/QueryFilter';

const { Sider, Content, Footer } = Layout;

const MainContainer = styled(Layout)`
  min-height: 100vh;
`;

const MainContent = styled(Content)`
  margin: 0 16px;
`;

const NavBreadcrumb = styled(Breadcrumb)`
  margin: 16px 0;
`;

const InnerContent = styled.div`
  padding: 24px;
  background: white;
  min-height: 360px;
`;

const MainFooter = styled(Footer)`
  text-align: center;
`;

export default class BasicLayout extends React.PureComponent {
  toggleSiderFold = (app, client) => {
    client.writeData({
      data: {
        app: {
          ...app,
          siderFold: !app.siderFold,
        },
      },
    });
  };

  render() {
    return (
      <Query query={MY_PROFILE}>
        {({ data: { profile }, ...rest }) => (
          <QueryFilter {...rest}>
            <MainContainer>
              <Query query={GET_APP}>
                {({ data: { app }, client }) => (
                  <Fragment>
                    <Sider
                      collapsible
                      collapsed={app.siderFold}
                      onCollapse={() => this.toggleSiderFold(app, client)}
                    >
                      <div>菜单</div>
                    </Sider>
                    <Layout>
                      <Header
                        siderFold={app.siderFold}
                        toggleSiderFold={() => this.toggleSiderFold(app, client)}
                      />
                      <MainContent>
                        <NavBreadcrumb>
                          <Breadcrumb.Item>首页</Breadcrumb.Item>
                          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        </NavBreadcrumb>
                        <InnerContent>Hi {profile.username}.</InnerContent>
                        <MainFooter>{pkg.description}</MainFooter>
                      </MainContent>
                    </Layout>
                  </Fragment>
                )}
              </Query>
            </MainContainer>
          </QueryFilter>
        )}
      </Query>
    );
  }
}
