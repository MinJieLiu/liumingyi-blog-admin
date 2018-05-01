import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { Layout, Icon, Menu, message } from 'antd';
import { LOGOUT } from '../../services/user';

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: white;
`;

const MenuSwitch = styled.div`
  padding: 0 20px;
  cursor: pointer;
  
  &:hover {
    background: #eee;
  }
`;

const HeaderMenu = styled(Menu)`
  margin-right: 20px;
  border: 0;
  z-index: auto;
`;

class NavHeader extends React.Component {
  static propTypes = {
    siderFold: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    toggleSiderFold: PropTypes.func.isRequired,
    history: PropTypes.object,
  };

  handleMenuClick = async ({ key }, client) => {
    // 登出
    if (key === 'logout') {
      const { data } = await client.query({ query: LOGOUT });
      if (data.logout.result) {
        message.success('退出成功');
        client.resetStore();
        this.props.history.replace('/login');
      }
    }
  };

  render() {
    const {
      siderFold,
      profile,
      toggleSiderFold,
    } = this.props;

    return (
      <Header>
        <MenuSwitch onClick={toggleSiderFold}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </MenuSwitch>
        <ApolloConsumer>
          {client => (
            <HeaderMenu
              mode="horizontal"
              selectedKeys={[]}
              onClick={param => this.handleMenuClick(param, client)}
            >
              <Menu.SubMenu title={<span><Icon type="user" />{profile.nickname || profile.username}</span>}>
                <Menu.Item><Icon type="solution" /> 个人信息</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" /> 退出</Menu.Item>
              </Menu.SubMenu>
            </HeaderMenu>
          )}
        </ApolloConsumer>

      </Header>
    );
  }
}

export default withRouter(NavHeader);
