export default [
  {
    title: 'dashboard',
    path: '/dashboard',
    component: () => import('../routes/Dashboard'),
  },
  {
    title: '用户管理',
    path: '/user',
    component: () => import('../routes/User'),
  },
];
