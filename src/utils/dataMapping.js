import { sorterMap, orderMap } from '../common/fieldMap';

/**
 * 将 AntD 排序转换为数组
 * 使用场景：AntD Table
 * @param {Object} sorter - AntD sorter 对象
 * @return {Array}
 */
export const convertToOrderArr = (sorter) => {
  if (sorter && sorter.field) {
    return [sorter.field, sorterMap[sorter.order]];
  }
  return [];
};

/**
 * 将排序数组转换为字段受控值
 * one of 'ascend'、'descend'、false
 * @param {Array} order - 排序数组
 * @param {String} currName - 当前字段
 */
export const convertToSortValue = (order, currName) => {
  if (order.length) {
    const [fieldName, orderName] = order;
    if (fieldName === currName) {
      return orderMap[orderName] || false;
    }
  }
  return false;
};

/**
 * 将字段映射转换为 AntD 表格 filter 结构数组
 * 使用场景：AntD Table
 * @param {Object} dataMap - 字段映射对象
 * @return {Array}
 */
export const mapToFilters = dataMap =>
  Object.keys(dataMap).map(item => ({ text: dataMap[item], value: item }));
