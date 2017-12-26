'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createDOMForm = require('rc-form/lib/createDOMForm');

var _createDOMForm2 = _interopRequireDefault(_createDOMForm);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

var _constants = require('./constants');

require('../styles/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Form2.default.create = function () {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var options = _extends({}, o, {
    fieldNameProp: 'id',
    fieldMetaProp: _constants.FIELD_META_PROP
  });

  var formWrapper = (0, _createDOMForm2.default)(options);

  return function (Component) {
    return formWrapper(_react2.default.createClass({
      propTypes: {
        form: _propTypes2.default.object.isRequired
      },
      childContextTypes: {
        form: _propTypes2.default.object.isRequired
      },
      getChildContext: function getChildContext() {
        return {
          form: this.props.form
        };
      },
      render: function render() {
        return _react2.default.createElement(Component, this.props);
      }
    }));
  };
};

_Form2.default.Form = _Form2.default;
_Form2.default.Item = _FormItem2.default;

exports.default = _Form2.default;