import { ChangeEvent } from 'react';
import DateTextField from './DateTextField/DateTextField';
import SimpleTextField from './SimpleTextField/SimpleTextField';
import TextAreaField from './TextAreaField/TextAreaField';
import TimeTextField from './TimeTextField/TimeTextField';

type Props = {
  value: string;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
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
  };

  return TYPES_AND_THEIR_COMPONENTS[type] ?? TYPES_AND_THEIR_COMPONENTS.text;
};

export default TextField;
