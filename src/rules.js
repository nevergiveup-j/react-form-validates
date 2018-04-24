
/**
 * 正则
 */
export const regex = {
  // 手机
  mobile: /^1[3|4|5|8|7|9][0-9]\d{8}$/,
  // 邮箱
  email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
  // 钱
  money: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
  // 用户
  name: /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
  // 密码
  pwd: /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/,
  // 身份证
  idCardNo: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
};

/**
 * 替换rule正则验证
 * @param {object} params 参数
 */
export function replaceRules(params) {
  const { rules } = params;

  if (rules) {
    const nRule = [];

    rules.map((item) => {
      const { type, ...other } = item;
      switch(type) {
        case 'isMobile':
          nRule.push({ pattern: regex.mobile, ...other });
          break;
        case 'isEmail':
          nRule.push({ pattern: regex.email, ...other });
          break;
        case 'isIdCard':
          nRule.push({ pattern: regex.idCardNo, ...other });
          break;
        default:
          nRule.push(item);
          break;
      }
    });

    params['rules'] = nRule;
  }

  return params;
};
