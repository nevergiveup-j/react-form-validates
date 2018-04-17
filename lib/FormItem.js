'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem() {
    _classCallCheck(this, FormItem);

    return _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));
  }

  _createClass(FormItem, [{
    key: 'getHelpMsg',
    value: function getHelpMsg() {
      var help = this.props.help;
      var form = this.context.form;


      if (help === undefined && form) {
        return this.getId() ? (form.getFieldError(this.getId()) || []).join(', ') : '';
      }

      return help;
    }
  }, {
    key: 'getOnlyControl',
    value: function getOnlyControl() {
      var children = _react2.default.Children.toArray(this.props.children);
      var child = null;

      children.map(function (c) {
        if (c.props) {
          if (_constants.FIELD_META_PROP in c.props) {
            child = c;
          } else {
            if (c.props.children) {
              var childs = _react2.default.Children.toArray(c.props.children);

              child = childs.filter(function (cc) {
                return cc.props && _constants.FIELD_META_PROP in cc.props;
              })[0];
            }
          }
        }
      });

      return child;
    }
  }, {
    key: 'getChildProp',
    value: function getChildProp(prop) {
      var child = this.getOnlyControl();

      if (!child) {
        return null;
      }

      return child && child.props && child.props[prop];
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this.getChildProp('id');
    }
  }, {
    key: 'renderHelp',
    value: function renderHelp() {
      var prefixCls = this.props.prefixCls;


      var help = this.getHelpMsg();

      return help ? _react2.default.createElement(
        'div',
        { className: prefixCls + '-explain' },
        help
      ) : null;
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      var _props = this.props,
          label = _props.label,
          prefixCls = _props.prefixCls;


      return label ? _react2.default.createElement(
        'div',
        { className: prefixCls + '-item-label' },
        label
      ) : null;
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props2 = this.props,
          children = _props2.children,
          prefixCls = _props2.prefixCls;


      if (!children) {
        return null;
      }

      children = _react2.default.Children.map(children, function (child) {
        if (child && typeof child.type === 'function' && !child.props.size) {
          return _react2.default.cloneElement(child, { size: 'large' });
        }
        return child;
      });

      return _react2.default.createElement(
        'div',
        { className: prefixCls + '-item-content' },
        children
      );
    }
  }, {
    key: 'renderDescription',
    value: function renderDescription() {
      var _props3 = this.props,
          description = _props3.description,
          prefixCls = _props3.prefixCls;


      if (!description) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: prefixCls + '-item-description' },
        description
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(children) {
      var _classnames;

      var _props4 = this.props,
          prefixCls = _props4.prefixCls,
          className = _props4.className,
          hasArrow = _props4.hasArrow;


      var itemClassName = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, prefixCls + '-item', true), _defineProperty(_classnames, prefixCls + '-item-help', !!this.getHelpMsg()), _defineProperty(_classnames, '' + className, !!className), _classnames));

      var arrowRender = hasArrow && _react2.default.createElement('div', { className: prefixCls + '-arrow' });

      return _react2.default.createElement(
        'div',
        { className: itemClassName },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-item-inner' },
          this.renderLabel(),
          children,
          this.renderDescription(),
          arrowRender
        ),
        this.renderHelp()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.renderChildren();
      return this.renderItem(children);
    }
  }]);

  return FormItem;
}(_react.Component);

FormItem.defaultProps = {
  prefixCls: 'ui-form',
  hasArrow: false
};

FormItem.propTypes = {
  prefixCls: _propTypes2.default.string,
  label: _propTypes2.default.node,
  description: _propTypes2.default.node,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  children: _propTypes2.default.node,
  hasArrow: _propTypes2.default.bool
};

FormItem.contextTypes = {
  form: _propTypes2.default.object
};

exports.default = FormItem;