import React from 'React';
import PropTypes from 'prop-types';
import createDOMForm from 'rc-form/lib/createDOMForm';

import Form from './Form'
import FormItem from './FormItem'

import './Form.scss'

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: 'data-__meta',
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

Form.Item = FormItem;

export default Form
