import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

/**
 * 递归生成导航菜单
 * type: 1：菜单，2：链接，3：按钮
 * @return ReactNode
 */
export const convertToNavMenu = (data, parentId = 0) => data
  .filter(item => item.parentId === parentId && item.id !== parentId)
  .map(item => (
    // 如果当前的子菜单只包含 “按钮” 类型，则不继续递归
    data.some(n => n.parentId === item.id && n.type !== 3) ? (
      <Menu.SubMenu
        key={item.id}
        title={(
          <Fragment>
            <Icon type={item.icon || 'file'} />
            <span className="nav-text">{item.name}</span>
          </Fragment>
        )}
      >
        {convertToNavMenu(data, item.id)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.id}>
        <Icon type={item.icon || 'file'} />
        <span className="nav-text">{item.name}</span>
      </Menu.Item>
    )
  ));

class NavMenu extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object.isRequired,
    MenuCollapsed: PropTypes.bool.isRequired,
    menus: PropTypes.array.isRequired,
  };

  handleMenuSelect = (params) => {
    const { history, menus } = this.props;
    const { pathname } = menus.find(n => n.id === Number(params.key));
    // 若是站外链接，则跳转
    if (pathname.includes('//')) {
      window.open(pathname);
      return;
    }
    // push
    history.push({
      pathname,
    });
  };

  render() {
    const {
      location,
      MenuCollapsed,
      menus,
    } = this.props;

    // 当前选中的菜单
    const selectedMenus = menus.filter(n => location.pathname === n.pathname);

    return (
      <Menu
        theme="dark"
        mode={MenuCollapsed ? 'vertical' : 'inline'}
        onSelect={this.handleMenuSelect}
        selectedKeys={selectedMenus.map(n => String(n.id))}
        defaultOpenKeys={(
          menus
            .filter(m => selectedMenus.some(n => n.parentId === m.id))
            .map(n => String(n.id))
        )}
      >
        {convertToNavMenu(menus)}
      </Menu>
    );
  }
}

export default withRouter(NavMenu);
