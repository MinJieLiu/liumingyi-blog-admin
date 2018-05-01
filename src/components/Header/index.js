import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Icon, Menu } from 'antd';

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

export default class extends React.Component {
  static propTypes = {
    siderFold: PropTypes.bool.isRequired,
    toggleSiderFold: PropTypes.func.isRequired,
  };

  handleMenuClick = ({ key }) => {
    // 登出
    if (key === 'logout') {
      // TODO
    }
  };

  render() {
    const {
      siderFold,
      toggleSiderFold,
    } = this.props;

    return (
      <Header>
        <MenuSwitch onClick={toggleSiderFold}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </MenuSwitch>
        <HeaderMenu
          mode="horizontal"
          selectedKeys={[]}
          onClick={this.handleMenuClick}
        >
          <Menu.SubMenu title={<span><Icon type="user" />liumingyi_1</span>}>
            <Menu.Item><Icon type="solution" /> 个人信息</Menu.Item>
            <Menu.Item key="logout"><Icon type="logout" /> 退出</Menu.Item>
          </Menu.SubMenu>
        </HeaderMenu>
      </Header>
    );
  }
}
