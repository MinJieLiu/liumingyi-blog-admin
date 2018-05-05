/**
 * 获取当前错误信息
 * @param e Exception
 * @returns { String }
 */
export const getCurrentErrorMessage = (e) => {
  if (e.graphQLErrors && e.graphQLErrors.length) {
    return e.graphQLErrors[0].message;
  }
  return e.message;
};
