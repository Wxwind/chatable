import { Input as InternalInput } from './Input';
import { TextArea } from './TextArea';

type CompoundedComponent = typeof InternalInput & {
  TextArea: typeof TextArea;
};

export const Input = InternalInput as CompoundedComponent;

Input.TextArea = TextArea;
