'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.replaceRules = replaceRules;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * 正则
 */
var regex = exports.regex = {
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
  idCardNo: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
};

/**
 * 替换rule正则验证
 * @param {object} params 参数
 */
function replaceRules(params) {
  var rules = params.rules;


  if (rules) {
    var nRule = [];

    rules.map(function (item) {
      var type = item.type,
          other = _objectWithoutProperties(item, ['type']);

      switch (type) {
        case 'isMobile':
          nRule.push(_extends({ pattern: regex.mobile }, other));
          break;
        case 'isEmail':
          nRule.push(_extends({ pattern: regex.email }, other));
          break;
        case 'isIdCard':
          nRule.push(_extends({ pattern: regex.idCardNo }, other));
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