# Form 表单
React 快速验证form

## Install
```
npm install react-form-validates --save
```

## Usage
```
import React, { Component } from 'react'
import { Picker, Input } from 'zarm';
import Form from 'react-form-validates';

import './App.scss';
import 'zarm/styles/index.scss';

const createForm = Form.create;
const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      certTypeDatas: [
        { value: '0', label: '请选择证件类型' },
        { value: '1', label: '身份证' },
        { value: '2', label: '护照' },
      ]
    };

    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((errors, value) => {
      console.log(errors)
      console.log(value)
    })

  }
  render() {
    const { certTypeDatas } = this.state;
    const { getFieldProps } = this.props.form;

    console.log('props', this.props)

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '用户名至少为 5 个字符' },
        { required: true, min: 5, regexp: /^\d/, message: '用户名至少为 5 个字符' },
      ]
    });

    const certTypeProps = getFieldProps('certType', {
      rules: [
        { required: true, message: '证件类型' },
      ]
    });

    const certNoProps = getFieldProps('certNo', {
      rules: [
        { required: true,  type: 'number', message: '证件号码必须为数字值' },
      ]
    });

    const phoneProps = getFieldProps('phone', {
      rules: [
        { required: true, type: 'url', message: '请输入手机号' },
      ]
    });

    return (
      <div className="form-wrap">
        <Form onSubmit={this.onSubmit}>
          <FormItem
            label="姓名"
          >
            <Input type="text" {...nameProps} placeholder="请输入姓名" />
          </FormItem>
          <FormItem
            label="证件类型"
          >
            <Picker
              dataSource={ certTypeDatas }
              />
          </FormItem>
          <FormItem
            label="证件号码"
          >
            <Input type="text" {...certNoProps} placeholder="请输入证件号码" />
          </FormItem>
          <FormItem
            label="手机号"
          >
            <Input type="number" {...phoneProps} placeholder="请输入手机号" />
          </FormItem>

          <div className="button-inner">
            <button type="submit" className="button-submit">提交</button>
          </div>
        </Form>
      </div>
    )
  }
}

export default createForm()(App);
```


## API
### Form

| 参数        | 说明                                                   |  类型   | 默认值  |
| --------   | -------------------------------------------------------| ------- | ------ |
| form       | 经 Form.create() 包装过的组件会自带 this.props.form 属性   | object  |        |
| onSubmit   | 数据验证成功后回调事件	                       | object  |Function(e:Event) |
| prefixCls  | 样式类名，默认为 ui-form，通常您不需要设                    | string  | ui-form|

### Form.create(options)
使用方式如下：

```
  class DemoForm extends Component {}

  export default Form.create({})(DemoForm);
```

`options`配置

| 参数              | 说明                                                   |  类型   |
| ---------------- | -------------------------------------------------------| ------- | ------ |
| onFieldsChange   | 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store  | Function(props, fields)|
| mapPropsToFields | 把 props 转为对应的值，可用于把 Redux store 中的值读出             | object  |

经过 `Form.create` 包装的组件将会自带 `this.props.form` 属性，`this.props.form` 提供的 API 如下：

| 参数              | 说明                                                   |  类型   |
| ---------------- | -------------------------------------------------------| ------- | ------ |
| getFieldsValue   | 获取一组输入控件的值，如不传入参数，则获取全部组件的值 | Function(props, fields)|
| getFieldValue    | 获取一个输入控件的值	                      | Function(fieldName: string) |
| setFieldsValue   | 设置一组输入控件的值	                 | Function({ [fieldname]: value }) |
| setFields        | 设置一组输入控件的值与 Error.                      | Function(obj: object) |
| validateFields   | 校验并获取一组输入域的值与 Error.   | Function([fieldNames: string[]], [options: object], callback: Function(errors, values)) |
| validateFieldsAndScroll | 与 `validateFields` 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围 | 参考 `validateFields` |
| getFieldError     | 获取某个输入控件的 Error                   | Function(name) |
| isFieldValidating | 判断一个输入控件是否在校验状态               | Function(name) |
| resetFields       | 重置一组输入控件的值与状态，如不传入参数，则重置所有组件 | Function([names: string[]]) |
| getFieldProps     | 用于和表单进行双向绑定，详见下方描述 |   |
### Form.Item

| 参数          | 说明                                      |  类型   | 可选值 | 默认值  |
| --------------| -----------------------------------------| ------ | ------- | ----- |
| label     | label 标签的文本	                             | node   |      |          |
| prefixCls | 样式类名，默认为 `ui-form`，通常您不需要设置       | string |      | ui-form  |
| className | 设置 className 值	                          | string |      |          |
| type      | 样式类型，有右边箭头	        | string |  'normal' 'link' 'select' |      |


### this.props.form.getFieldProps(id, options)
id 必填，输入控件唯一标志  
getFieldProps options

| 参数          | 说明                                                 |  类型   | 默认值  |
| --------------| ----------------------------------------------------| ------- | ------ |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'              | string  | value  |
| initialValue  | 子节点的初始值，类型、可选值均由子节点决定                 | string  |'onChange' |
| trigger       | 收集子节点的值的时机	                                 | string  | ui-form|
| validateTrigger | 校验子节点值的时机		                              | string  | 'onChange'|
| rules         | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator)                        | array  | |
| onXXX | 由于 `getFieldProps` 会占用 `onChange` 等事件（即你所设置的 `trigger` `validateTrigger`），所以如果仍需绑定事件，请在 `options` 内设置 | function  | 无|
| exclusive | 是否和其他控件互斥，特别用于 Radio 单选控件                   | boolean  | false|
