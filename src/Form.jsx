import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import createDOMForm from 'rc-form/lib/createDOMForm';

import FormItem from './FormItem';
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';
import { FormContext } from './context';

export default class Form extends Component {
  static defaultProps = {
    prefixCls: 'ui-form',
    labelAlign: 'left',
    onSubmit(e) {
      e.preventDefault();
    }
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    labelAlign: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
    children: PropTypes.any,
    form: PropTypes.object,
    onSubmit: PropTypes.func
  };

  static Item = FormItem;

  static create = (options) => {
    return createDOMForm({
      fieldNameProp: 'id',
      ...options,
      fieldMetaProp: FIELD_META_PROP,
      fieldDataProp: FIELD_DATA_PROP,
    });
  }

  render () {
    const { prefixCls, className, style, labelAlign } = this.props;

    const formClassName = classnames({
      [`${prefixCls}`]: true,
      [`${className}`]: !!className
    });

    return (
      <FormContext.Provider value={{ prefixCls, labelAlign }}>
        <form className={formClassName} style={style}>
          {this.props.children}
        </form>
      </FormContext.Provider>
    )
  }
}

