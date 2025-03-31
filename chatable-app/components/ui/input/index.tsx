import InternalInput from './Input';
import { InputItem } from './item';
import TextArea from './TextArea/index';

type InternalInputType = typeof InternalInput;

type CompoundedComponent = InternalInputType & {
  TextArea: typeof TextArea;
  Item: typeof InputItem;
};

const Input = InternalInput as CompoundedComponent;

Input.TextArea = TextArea;
Input.Item = InputItem;

export default Input;
