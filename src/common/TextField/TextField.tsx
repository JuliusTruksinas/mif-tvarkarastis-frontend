import { ChangeEvent } from 'react';
import DateTextField from './DateTextField/DateTextField';
import SimpleTextField from './SimpleTextField/SimpleTextField';
import TextAreaField from './TextAreaField/TextAreaField';
import TimeTextField from './TimeTextField/TimeTextField';
import SelectTextField, {
  SelectOption,
} from './SelectTextField/SelectTextField';

type Props = {
  value: string;
  type: string;
  name: string;
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  onChange: (e: ChangeEvent) => void;
};

const TextField = ({
  value,
  type,
  name,
  label,
  placeholder,
  elementClassName,
  containerClassName,
  onChange,
  options,
  labelClassName,
}: Props) => {
  const TYPES_AND_THEIR_COMPONENTS = {
    text: (
      <SimpleTextField
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
        labelClassName={labelClassName}
      />
    ),
    password: (
      <SimpleTextField
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
        labelClassName={labelClassName}
        isPassword
      />
    ),
    date: (
      <DateTextField
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
      />
    ),
    time: (
      <TimeTextField
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
      />
    ),
    textArea: (
      <TextAreaField
        name={name}
        value={value}
        label={label}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
      />
    ),
    select: (
      <SelectTextField
        name={name}
        value={value}
        label={label}
        options={options}
        placeholder={placeholder}
        elementClassName={elementClassName}
        onChange={onChange}
        containerClassName={containerClassName}
        labelClassName={labelClassName}
      />
    ),
  };

  return TYPES_AND_THEIR_COMPONENTS[type] ?? TYPES_AND_THEIR_COMPONENTS.text;
};

export default TextField;
