// 菜单配置
const menuConfig = [
  {
    name: '仪表盘',
    icon: 'dashboard',
    path: 'dashboard',
    authority: 'SYS_INDEX',
  },
  {
    name: '用户管理',
    icon: 'user',
    path: 'user',
    authority: 'SYS_USER',
  },
  {
    name: '角色管理',
    icon: 'bars',
    path: 'role',
    authority: 'SYS_ROLE',
  },
  {
    name: '菜单管理',
    icon: 'profile',
    path: 'menu',
    authority: 'SYS_MENU',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
    // hideInMenu: true,
  },
  {
    name: '测试菜单',
    path: 'exception',
    children: [
      {
        name: '分析页',
        path: 'analysis',
        children: [
          {
            name: '分析页',
            path: 'analysis',
          },
          {
            name: '监控页',
            path: 'monitor',
          },
          {
            name: '工作台',
            path: 'workplace',
          },
        ],
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
      },
    ],
  },
];

const menuFormatter = (data, parentPath = '/', parentAuthority) => data.map((item) => {
  const result = {
    ...item,
    path: parentPath + item.path,
    authority: item.authority || parentAuthority,
  };
  if (item.children) {
    result.children = menuFormatter(item.children, `${parentPath}${item.path}/`, item.authority);
  }
  return result;
});

const getMenuData = () => menuFormatter(menuConfig);

export default getMenuData();
