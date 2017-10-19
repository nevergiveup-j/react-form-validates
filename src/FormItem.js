import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class FormItem extends Component {
  renderHelp() {
    const { prefixCls } = this.props;

    return (
      <div className={`${prefixCls}-item-help`}>
        请输入邮箱
      </div>
    )
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

export default FormItem
