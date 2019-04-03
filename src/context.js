import createReactContext, { Context } from 'create-react-context';

export const FormContext = createReactContext({
  prefixCls: 'ui-form',
  labelAlign: 'left',
});