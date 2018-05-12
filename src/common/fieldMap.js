import invert from 'lodash/invert';

/**
 * Boolean
 */
export const boolMap = {
  0: '否',
  1: '是',
};

/**
 * 启用状态
 */
export const enableMap = {
  0: '禁用',
  1: '启用',
};

/**
 * 菜单类型
 */
export const menuTypeMap = {
  1: '菜单',
  2: '链接',
  3: '按钮',
};

/**
 * AntD 排序
 */
export const sorterMap = {
  ascend: 'ASC',
  descend: 'DESC',
};

/**
 * 数据库排序
 */
export const orderMap = invert(sorterMap);
