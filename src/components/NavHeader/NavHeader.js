import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
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
    history: PropTypes.object,
    MenuCollapsed: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  };

  handleMenuClick = async ({ key }, logout) => {
    // 登出
    if (key === 'logout') {
      const { data } = await logout();
      if (data.logout.result) {
        message.success('退出成功');
        this.props.history.replace('/login');
      }
    }
  };

  render() {
    const {
      MenuCollapsed,
      profile,
      toggleMenu,
    } = this.props;

    return (
      <Header>
        <MenuSwitch onClick={toggleMenu}>
          <Icon type={MenuCollapsed ? 'menu-unfold' : 'menu-fold'} />
        </MenuSwitch>
        <Mutation mutation={LOGOUT}>
          {logout => (
            <HeaderMenu
              mode="horizontal"
              selectedKeys={[]}
              onClick={param => this.handleMenuClick(param, logout)}
            >
              <Menu.SubMenu title={<span><Icon type="user" />{profile.nickname || profile.username}</span>}>
                <Menu.Item><Icon type="solution" /> 个人信息</Menu.Item>
                <Menu.Item key="logout"><Icon type="logout" /> 退出</Menu.Item>
              </Menu.SubMenu>
            </HeaderMenu>
          )}
        </Mutation>
      </Header>
    );
  }
}

export default withRouter(NavHeader);
