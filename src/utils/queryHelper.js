import pickBy from 'lodash/pickBy';

/**
 * 将 Antd 排序转换为数组
 * 使用场景：Antd Table
 * @param { Object } sorter
 * @return { Array | null }
 */
export const convertToOrder = (sorter) => {
  if (sorter && sorter.field) {
    return [sorter.field, sorter.order === 'ascend' ? 'ASC' : 'DESC'];
  }
  return null;
};

/**
 * 将 Antd 筛选参数数组，转换为 Int
 * 使用场景：转换查询参数
 * @param { Array } arr
 * @return { Number | undefined }
 */
export const convertFilterToInt = (arr) => {
  if (Array.isArray(arr)) {
    if (arr.length) {
      return Number(arr[0]);
    }
  }
  return undefined;
};

/**
 * 将字符串数组转换为 Int 数组
 * 使用场景：转换查询参数
 * @param { Array } arr
 * @return { Array | undefined}
 */
export const convertToIntArr = (arr) => {
  if (arr) {
    return arr.map(Number);
  }
  return undefined;
};

/**
 * 过滤查询数据
 * 避免 __typename 传入服务端
 * 过滤值为 null 的数据
 * 使用场景：转换查询参数
 * @param { Object } queryObj
 * @returns { Object }
 */
export const filterQuery = queryObj =>
  pickBy(queryObj, (value, key) => value !== null && key !== '__typename');

/**
 * 将数据映射转换为 Antd Table Filter
 * 使用场景：Antd Table
 * @param dataMap
 * @returns { Array }
 */
export const mapToFilters = dataMap =>
  Object.keys(dataMap).map(item => ({ text: dataMap[item], value: item }));
