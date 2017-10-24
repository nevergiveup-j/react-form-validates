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
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
      ]
    });

    return (
      <div className="form-wrap">
        <form onSubmit={ this.onSubmit.bind(this) }>
          <FormItem
            label="姓名"
          >
            <input {...nameProps} placeholder="请输入姓名" />
          </FormItem>
          <FormItem
            label="证件类型"
          >
            <select>
              <option>身份证</option>
            </select>
          </FormItem>
          <FormItem
            label="证件号码"
          >
            <input placeholder="请输入证件号码" />
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
