import React from 'react';
import PropTypes from 'prop-types';
import createDOMForm from 'rc-form/lib/createDOMForm';

import Form from './Form';
import FormItem from './FormItem';
import { FIELD_META_PROP } from './constants';
// import { replaceRules } from './rules';

import '../styles/index.css';

let formContext = {};

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
    // componentWillMount() {
    //   const { form } = this.props;
    //
    //   formContext = Object.assign({}, form);
    //
    //   console.log('formContext==', formContext);
    //
    //   formContext.getFieldProps = (name, option) => {
    //     return form.getFieldProps(name, replaceRules(option));
    //   }
    // },
    getChildContext() {
      return {
        form: this.props.form,
      };
    },
    render() {
      // const { form, ...other } = this.props;

      return <Component {...this.props} />
      // return <Component form={formContext} {...other} />;
    }
  }));
}

Form.Form = Form;
Form.Item = FormItem;

export default Form;
