import React, { Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';
import DocumentTitle from 'react-document-title';
import { Query } from 'react-apollo';
import routeData from '../common/route';
import pkg from '../../package.json';
import { MY_PROFILE } from '../services/profile';
import { GET_APP } from '../services/app';
import NavHeader from '../components/NavHeader';
import NavMenu from '../components/NavMenu';
import { AuthorizedRoute } from '../components/Authorized';
import { AsyncComponent } from '../common/dynamic';
import queryFilter from '../common/queryFilter';

const { Sider, Content, Footer } = Layout;

const MainContainer = styled(Layout)`
  min-height: 100vh;
`;

const Logo = styled.div`
  margin: 16px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
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
  handleToggleMenu = (app, client) => {
    client.writeData({
      data: {
        app: {
          ...app,
          MenuCollapsed: !app.MenuCollapsed,
        },
      },
    });
  };

  render() {
    return (
      <Query query={MY_PROFILE}>
        {queryFilter(({ data }) => (
          <MainContainer>
            <Query query={GET_APP}>
              {({ data: { app }, client }) => (
                <Fragment>
                  <Sider
                    collapsible
                    collapsed={app.MenuCollapsed}
                    onCollapse={() => this.handleToggleMenu(app, client)}
                  >
                    <Logo />
                    <NavMenu MenuCollapsed={app.MenuCollapsed} menus={data.profile.menus} />
                  </Sider>
                  <Layout>
                    <NavHeader
                      profile={data.profile}
                      MenuCollapsed={app.MenuCollapsed}
                      toggleMenu={() => this.handleToggleMenu(app, client)}
                    />
                    <MainContent>
                      <NavBreadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                      </NavBreadcrumb>
                      <InnerContent>
                        {routeData.map(route => (
                          <AuthorizedRoute
                            key={route.path}
                            path={route.path}
                            authority={route.authority}
                            render={props => (
                              <DocumentTitle title={route.title}>
                                <AsyncComponent component={route.component} {...props} />
                              </DocumentTitle>
                            )}
                          />
                        ))}
                      </InnerContent>
                      <MainFooter>{pkg.description}</MainFooter>
                    </MainContent>
                  </Layout>
                </Fragment>
              )}
            </Query>
          </MainContainer>
        ))}
      </Query>
    );
  }
}
