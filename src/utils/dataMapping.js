
/**
 * 将字段映射转换为 AntD 表格筛选结构数组
 * 使用场景：AntD Table
 * @param {Object} dataMap - 字段映射对象
 * @return {Array}
 */
export const mapToFilters = dataMap =>
  Object.keys(dataMap).map(item => ({ text: dataMap[item], value: item }));
