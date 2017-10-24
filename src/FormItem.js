import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const FIELD_META_PROP = 'data-__meta';

class FormItem extends Component {
  getHelpMsg() {
    const { help } = this.props;
    const { form } = this.context;

    if(help === undefined && form) {
      return this.getId() ? (form.getFieldError(this.getId()) || []).join(', ') : ''
    }

    return help;
  }
  getOnlyControl() {
    const children = React.Children.toArray(this.props.children);
    const child = children.filter((c) => {
      return c.props && FIELD_META_PROP in c.props;
    })[0];
    return child !== undefined ? child : null;
  }
  getChildProp(prop) {
    const child = this.getOnlyControl();
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
    ) : null
  }
  renderLabel() {
    const { label, prefixCls } = this.props;

    return label ? (
      <div className={`${prefixCls}-item-label`}>{label}</div>
    ) : null;
  }
  renderChildren() {
    let { children, prefixCls } = this.props;

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
  renderItem(children) {
    const { prefixCls, className} = this.props;

    const itemClassName = classnames({
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-help`]: !!this.getHelpMsg(),
      [`${className}`]: !!className
    })

    return (
      <div className={itemClassName}>
        <div className={`${prefixCls}-item-wrap`}>
          {this.renderLabel()}
          {children}
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
  prefixCls: 'ui-form'
}

FormItem.propTypes = {
  prefixCls: React.PropTypes.string,
  label: React.PropTypes.node,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  children: React.PropTypes.node
}

FormItem.contextTypes = {
  form: React.PropTypes.object
}

export default FormItem
