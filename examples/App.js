import React, { Component } from 'react'
import { createForm } from 'rc-form';
import { Cell, Input, Button, Picker } from 'zarm';

import Form from '../src/index';

import './App.scss';
import 'zarm/styles/index.scss';

const FormItem = Form.Item;

console.log(Form)

class App extends Component {
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    console.log(this.props);
    return (
      <div className="form-wrap">
        <form onSubmit={ this.onSubmit.bind(this) }>
          <FormItem
            label="姓名"
          >
            <input placeholder="请输入姓名" />
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


          <Button theme="success">
            提交
          </Button>
        </form>
      </div>
    )
  }
}

export default createForm()(App);
