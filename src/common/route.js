export default [
  {
    title: 'dashboard',
    path: '/dashboard',
    component: () => import('../routes/Dashboard'),
    authority: 'SYS_INDEX',
  },
  {
    title: '用户管理',
    path: '/user',
    component: () => import('../routes/User'),
    authority: 'SYS_USER',
  },
];
