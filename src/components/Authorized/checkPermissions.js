/**
 * 通用权限检查方法
 * @param {Array} currentAuthority - 用户拥有的权限
 * @param {String | Array | Function} authority - 功能所需权限
 * @param {React.Component} target - 通过的组件
 * @param {React.Component} Exception - 未通过的组件
 */
const checkPermissions = (currentAuthority = [], authority, target, Exception) => {
  // 没有判定权限，默认查看所有
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.every(item => currentAuthority.includes(item))) {
      return target;
    }
    return Exception;
  }

  // String 处理
  if (typeof authority === 'string') {
    if (currentAuthority.includes(authority)) {
      return target;
    }
    return Exception;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      if (authority(currentAuthority)) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('Unsupported parameters');
};

export default checkPermissions;
