import React from 'react';
import PropTypes from 'prop-types';
import createDOMForm from 'rc-form/lib/createDOMForm';

import Form from './Form';
import FormItem from './FormItem';
import { FIELD_META_PROP } from './constants';

import '../styles/index.css';

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: FIELD_META_PROP,
  };

  const formWrapper = createDOMForm(options);

  return (Component) => formWrapper(React.createClass({
    propTypes: {
      form: PropTypes.object.isRequired,
    },
    childContextTypes: {
      form: PropTypes.object.isRequired,
    },
    getChildContext() {
      return {
        form: this.props.form,
      };
    },
    render() {
      return <Component {...this.props} />;
    }
  }));
}

Form.Form = Form;
Form.Item = FormItem;

export default Form;
