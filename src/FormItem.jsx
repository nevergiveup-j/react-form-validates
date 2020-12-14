import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import { FormContext } from './context';

class FormItem extends Component {
  static defaultProps = {
    hasArrow: false,
  };

  static propTypes = {
    prefixCls:   PropTypes.string,
    label:       PropTypes.node,
    description: PropTypes.node,
    className:   PropTypes.string,
    id:          PropTypes.string,
    children:    PropTypes.node,
    hasArrow:    PropTypes.bool,
    style:       PropTypes.any,
  };
  getHelpMsg() {
    const { help } = this.props;
    const { form } = this.context;

    if (help === undefined && this.getOnlyControl()) {
      const { errors } = this.getField();
      if (errors) {
        return errors.map((e, index) => {
          let node = null;
          if (React.isValidElement(e)) {
            node = e;
          } else if (React.isValidElement(e.message)) {
            node = e.message;
          }

          return node ? React.cloneElement(node, { key: index }) : e.message;
        });
      }
      return '';
    }

    return help;
  }
  getControls(children = this.props.children, recursively = false) {
    let controls = [];
    const childrenArray = React.Children.toArray(children);

    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }

      const child = childrenArray[i];

      if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
        continue;
      }

      if (!child.props) {
        continue;
      }

      if (FIELD_META_PROP in child.props) {
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(this.getControls(child.props.children, recursively));
      }
    }

    return controls;
  }
  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  }
  getChildProp(prop) {
    const child = this.getOnlyControl();

    if(!child) {
      return null;
    }

    return child && child.props && child.props[prop];
  }
  getId() {
    return this.getChildProp('id');
  }
  getField() {
    return this.getChildProp(FIELD_DATA_PROP);
  }
  renderHelp(context) {
    const { prefixCls } = context;

    const help = this.getHelpMsg();

    return help ? (
      <div className={`${prefixCls}-explain`}>
        {help.length ? help[0] : ''}
      </div>
    ) : null;
  }
  renderLabel(context) {
    const { label } = this.props;
    const { prefixCls, labelAlign } = context;

    return label ? (
      <div className={`${prefixCls}-item-label ${prefixCls}-item-label-${labelAlign}`}>{label}</div>
    ) : null;
  }
  renderChildren(context) {
    let { children, style } = this.props;
    const { prefixCls } = context;

    if (!children) {
      return null;
    }

    children = React.Children.map(children, (child) => {
      if (child && typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, { size: 'large' });
      }
      return child;
    });

    return (
      <div className={`${prefixCls}-item-content`} style={style}>
        {children}
      </div>
    )
  }
  renderDescription(context) {
    const { description, style } = this.props;
    const { prefixCls } = context;

    if (!description) {
      return null;
    }

    return (
      <div className={`${prefixCls}-item-description`} style={style}>
        {description}
      </div>
    )
  }
  renderItem(context) {
    const { className, hasArrow, style } = this.props;
    const { prefixCls } = context;
    const children = this.renderChildren(context);

    const itemClassName = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-help`]: !!this.getHelpMsg(),
      [`${className}`]: !!className
    });

    const arrowRender = hasArrow && <div className={`${prefixCls}-arrow`} />;
    
    return (
      
      <div className={itemClassName} style={style}>
        <div className={`${prefixCls}-item-inner`}>
          {this.renderLabel(context)}
          {children}
          {this.renderDescription(context)}
          {arrowRender}
        </div>
        {this.renderHelp(context)}
      </div>
    )
  }
  render() {
    return (
      <FormContext.Consumer>
        {context => this.renderItem(context)}
      </FormContext.Consumer>
    )
  }
}

export default FormItem
