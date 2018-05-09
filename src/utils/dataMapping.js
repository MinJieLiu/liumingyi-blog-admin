/**
 * 将数据映射转换为 Antd Table Filter
 * @param dataMap
 * @returns { Array }
 */
export const mapToFilters = dataMap =>
  Object.keys(dataMap).map(item => ({ text: dataMap[item], value: item }));

/**
 * 将 Antd 排序转换为查询参数
 */
export const convertToOrder = ({ field, order }) =>
  field ? [field, order === 'ascend' ? 'ASC' : 'DESC'] : null;
