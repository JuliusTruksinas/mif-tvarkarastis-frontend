import { SelectOption } from '../common/TextField/SelectTextField/SelectTextField';

export interface FormInput {
  name: string;
  value: string;
  type?: string;
  label?: string;
  placeholder?: string;
  elementClassName?: string;
  containerClassName?: string;
  options?: SelectOption[];
  isLoading?: boolean;
  fieldsToClearOnChange?: string[];
}

export type FormBehavior = {
  submitOnChange?: boolean;
};
