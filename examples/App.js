import React, { Component } from 'react'

import Form from '../src/index';

import './App.scss';
import 'zarm/styles/index.scss';

const createForm = Form.create;
const FormItem = Form.Item;

class App extends Component {
  onSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((errors, value) => {
      console.log(errors)
      console.log(value)
    })

    console.log(this.props)
  }
  render() {
    const { getFieldProps } = this.props.form;

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
      ]
    });

    const certTypeProps = getFieldProps('certType', {
      rules: [
        { required: true, message: '证件类型' },
      ]
    });

    const certNoProps = getFieldProps('certNo', {
      rules: [
        { required: true, type: 'number', message: '证件号码必须为数字值' },
      ]
    });

    return (
      <div className="form-wrap">
        <form onSubmit={ this.onSubmit.bind(this) }>
          <FormItem
            label="姓名"
          >
            <input type="text" {...nameProps} placeholder="请输入姓名" />
          </FormItem>
          <FormItem
            label="证件类型"
          >
            <select {...certTypeProps}>
              <option value="">请选择证件类型</option>
              <option value="1">身份证</option>
            </select>
          </FormItem>
          <FormItem
            label="证件号码"
          >
            <input type="text" {...certNoProps} placeholder="请输入证件号码" />
          </FormItem>

          <div className="button-inner">
            <button type="submit" className="button-submit">提交</button>
          </div>
        </form>
      </div>
    )
  }
}

export default createForm()(App);
