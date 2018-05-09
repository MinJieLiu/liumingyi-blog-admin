import pickBy from 'lodash/pickBy';

/**
 * 过滤查询数据
 * 避免 __typename 传入服务端
 * 过滤值为 null 的数据
 * @param { Object } queryObj
 * @returns { Object }
 */
export const filterQuery = queryObj =>
  pickBy(queryObj, (value, key) => value !== null && key !== '__typename');

/**
 * 将查询字段转换为 number 类型
 * @param field
 * @return {any}
 */
export const convertToNumberField = field => (field ? Number(field) : null);
