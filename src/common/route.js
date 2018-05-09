export default [
  {
    title: '仪表盘',
    path: '/',
    component: () => import('../routes/Dashboard'),
    authority: 'SYS_INDEX',
    hideBreadcrumb: true,
  },
  {
    title: '用户管理',
    path: '/user',
    component: () => import('../routes/User'),
    authority: 'SYS_USER',
  },
];
