import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FIELD_META_PROP } from './constants';

class FormItem extends Component {
  getHelpMsg() {
    const { help } = this.props;
    const { form } = this.context;

    if(help === undefined && form) {
      return this.getId() ? (form.getFieldError(this.getId()) || []).join(', ') : '';
    }

    return help;
  }
  getOnlyControl() {
    const children = React.Children.toArray(this.props.children);
    let child = null;

    children.map((c) => {
      if(c.props) {
        if(FIELD_META_PROP in c.props) {
          child = c;
        }else{
          if(c.props.children) {
            const childs = React.Children.toArray(c.props.children);
            
            child = childs.filter((cc) => cc.props && FIELD_META_PROP in cc.props)[0];
          }
        }
      }
    });
    
    return child;
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
  renderHelp() {
    const { prefixCls } = this.props;

    const help = this.getHelpMsg();

    return help ? (
      <div className={`${prefixCls}-explain`}>
        {help}
      </div>
    ) : null;
  }
  renderLabel() {
    const { label, prefixCls } = this.props;

    return label ? (
      <div className={`${prefixCls}-item-label`}>{label}</div>
    ) : null;
  }
  renderChildren() {
    let { children, prefixCls } = this.props;

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
      <div className={`${prefixCls}-item-content`}>
        {children}
      </div>
    )
  }
  renderDescription() {
    const { description, prefixCls } = this.props;

    if (!description) {
      return null;
    }

    return (
      <div className={`${prefixCls}-item-description`}>
        {description}
      </div>
    )
  }
  renderItem(children) {
    const { prefixCls, className, hasArrow } = this.props;

    const itemClassName = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-help`]: !!this.getHelpMsg(),
      [`${className}`]: !!className
    });

    const arrowRender = hasArrow && <div className={`${prefixCls}-arrow`} />;
    
    return (
      <div className={itemClassName}>
        <div className={`${prefixCls}-item-inner`}>
          {this.renderLabel()}
          {children}
          {this.renderDescription()}
          {arrowRender}
        </div>
        {this.renderHelp()}
      </div>
    )
  }
  render() {
    const children = this.renderChildren();
    return this.renderItem(children)
  }
}

FormItem.defaultProps = {
  prefixCls: 'ui-form',
  hasArrow: false,
}

FormItem.propTypes = {
  prefixCls:   PropTypes.string,
  label:       PropTypes.node,
  description: PropTypes.node,
  className:   PropTypes.string,
  id:          PropTypes.string,
  children:    PropTypes.node,
  hasArrow:    PropTypes.bool,
}

FormItem.contextTypes = {
  form: PropTypes.object
}

export default FormItem
