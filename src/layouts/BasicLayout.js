import React, { Fragment } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import DocumentTitle from 'react-document-title';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router-dom';
import routeData from '../common/route';
import pkg from '../../package.json';
import { MY_PROFILE } from '../services/profile';
import { GET_APP } from '../services/app';
import NavHeader from '../components/NavHeader';
import NavBreadcrumb from '../components/NavBreadcrumb';
import NavMenu from '../components/NavMenu';
import Exception from '../components/Exception';
import { AuthorizedRoute } from '../components/Authorized';
import { AsyncComponent } from '../common/dynamic';
import queryFilter from '../common/queryFilter';

const { Sider, Content, Footer } = Layout;

const MainContainer = styled(Layout)`
  height: 100%;
`;

const Logo = styled.div`
  margin: 16px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
`;

const MainLayout = styled(Layout)`
  height: 100%;
`;

const MainContent = styled(Content)`
  padding: 0 16px;
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
                  <MainLayout>
                    <NavHeader
                      client={client}
                      profile={data.profile}
                      MenuCollapsed={app.MenuCollapsed}
                      toggleMenu={() => this.handleToggleMenu(app, client)}
                    />
                    <MainContent>
                      <NavBreadcrumb profile={data.profile} />
                      <InnerContent>
                        <Switch>
                          {routeData.map(route => (
                            <AuthorizedRoute
                              key={route.path}
                              path={route.path}
                              authority={route.authority}
                              render={props => (
                                <DocumentTitle title={route.title || pkg.description}>
                                  <AsyncComponent component={route.component} {...props} />
                                </DocumentTitle>
                              )}
                            />
                          ))}
                          <Route render={() => <DocumentTitle title="404"><Exception type="404" /></DocumentTitle>} />
                        </Switch>
                      </InnerContent>
                      <MainFooter>{pkg.description}</MainFooter>
                    </MainContent>
                  </MainLayout>
                </Fragment>
              )}
            </Query>
          </MainContainer>
        ))}
      </Query>
    );
  }
}
