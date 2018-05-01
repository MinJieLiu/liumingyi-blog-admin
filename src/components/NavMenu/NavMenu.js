import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuData from '../../common/menu';

/**
 * 生成菜单
 * @return ReactNode
 */
export const convertToNavMenu = data => (
  data.map(item => (
    item.children ? (
      <Menu.SubMenu
        key={item.path}
        title={(
          <Fragment>
            <Icon type={item.icon || 'file'} />
            <span className="nav-text">{item.name}</span>
          </Fragment>
        )}
      >
        {convertToNavMenu(item.children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.path}>
        <Icon type={item.icon || 'file'} />
        <span className="nav-text">{item.name}</span>
      </Menu.Item>
    )
  ))
);

class LeftMenu extends React.Component {
  static propTypes = {
    siderFold: PropTypes.bool.isRequired,
    history: PropTypes.object,
  };

  handleMenuSelect = ({ key }) => {
    const { history } = this.props;

    // push
    history.push({
      pathname: key,
    });
  };

  render() {
    const {
      siderFold,
    } = this.props;

    // 当前默认展开的菜单

    return (
      <Menu
        theme="dark"
        mode={siderFold ? 'vertical' : 'inline'}
        onSelect={this.handleMenuSelect}
        selectedKeys={['1']}
        defaultOpenKeys={['1']}
      >
        {convertToNavMenu(menuData)}
      </Menu>
    );
  }
}

export default withRouter(LeftMenu);
