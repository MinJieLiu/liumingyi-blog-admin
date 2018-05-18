import pickBy from 'lodash/pickBy';

/**
 * 将 Int 数据转换为 String
 * 使用场景：数据转换为表单
 * @param {Number} value
 * @return {String | undefined}
 */
export const convertNumberToString = (value) => {
  if (Number.isInteger(value)) {
    return String(value);
  }
  return undefined;
};

/**
 * 将 String 数据转换为 Int
 * 使用场景：表单转换为数据
 * @param {String} value
 * @return {Number | undefined}
 */
export const convertStringToNumber = (value) => {
  if (typeof value === 'string') {
    return Number(value);
  }
  return undefined;
};

/**
 * 将 AntD 筛选参数数组，转换为 Int
 * 使用场景：转换查询参数
 * @param {Array} arr - AntD 表格 Filter 数组
 * @return {Number | undefined}
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
 * @param {Array} arr - 字符串数组
 * @return {Array | undefined}
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
 * @param {Object} query - 查询对象
 * @return {Object} - 过滤后的数据
 */
export const filterQuery = query =>
  pickBy(query, (value, key) => value !== null && key !== '__typename');
