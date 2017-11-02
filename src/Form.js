import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Form extends Component {
  render () {
    const { prefixCls, className, style, ...otherProps } = this.props;

    const formClassName = classnames({
      [`${prefixCls}`]: true,
      [`${className}`]: !!className
    });

    return (
      <form {...otherProps} className={formClassName} style={style}>
        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  prefixCls: 'ui-form',
  onSubmit(e) {
    e.preventDefault();
  },
}

Form.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
}

export default Form
