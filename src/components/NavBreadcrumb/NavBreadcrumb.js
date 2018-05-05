import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const StyledBreadcrumb = styled(Breadcrumb)`
  && {
    flex-shrink: 0;
    margin: 16px 0;
  }
`;

/**
 * 递归生成菜单数组
 * @param { Array } menus
 * @param { Array } currentMenuArr
 * @returns { Array }
 */
const generateMenuArr = (menus, currentMenuArr) => {
  if (currentMenuArr.length) {
    const parentMenuArr = menus.filter(item =>
      item.id === currentMenuArr[0].parentId && item.id !== currentMenuArr[0].id);
    if (parentMenuArr.length) {
      return generateMenuArr(menus, parentMenuArr.concat(currentMenuArr));
    }
    return currentMenuArr;
  }
  return [];
};

class NavBreadcrumb extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  render() {
    const {
      location,
      profile: { menus },
    } = this.props;

    return (
      <StyledBreadcrumb>
        {generateMenuArr(menus, menus.filter(menu => location.pathname === menu.pathname))
          .map(menu => (
            <Breadcrumb.Item key={menu.id}>
              {menu.name}
            </Breadcrumb.Item>
          ))}
      </StyledBreadcrumb>
    );
  }
}

export default withRouter(NavBreadcrumb);
