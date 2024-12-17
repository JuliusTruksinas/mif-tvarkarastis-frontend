import { ChangeEvent, useState } from 'react';
import { FormInput, FormBehavior } from '../domain/form';

export const useForm = <T>(
  inputBlueprints: FormInput[],
  onFormSubmit?: (inputs: T) => void,
  formBehavior?: FormBehavior,
) => {
  const [inputs, setInputs] = useState<FormInput[]>(inputBlueprints);

  const getSubmitInputs = (submitInputs: Array<FormInput>) =>
    Object.assign(
      {},
      ...submitInputs.map((input) => ({
        [input.name]:
          typeof input.value === 'string' ? input.value.trim() : input.value,
      })),
    );

  const getInputByName = (name: string) =>
    inputs.find((input) => input.name === name);

  const updateInputValue = (inputs, name, value) => {
    return inputs.map((input) =>
      input.name === name ? { ...input, value } : input,
    );
  };

  const clearDependentFields = (inputs, fieldsToClearOnChange) => {
    return inputs.map((input) =>
      fieldsToClearOnChange.includes(input.name)
        ? { ...input, value: '' }
        : input,
    );
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => {
      let updatedInputs = updateInputValue(prevInputs, name, value);

      const changedInput = prevInputs.find((input) => input.name === name);
      if (changedInput?.fieldsToClearOnChange) {
        updatedInputs = clearDependentFields(
          updatedInputs,
          changedInput.fieldsToClearOnChange,
        );
      }

      if (formBehavior?.submitOnChange && onFormSubmit) {
        onFormSubmit(getSubmitInputs(updatedInputs));
      }

      return updatedInputs;
    });
  };

  const setNewInputValue = (name: string, newValue: any) => {
    setInputs((prevInputs) =>
      prevInputs.map((prevInput) =>
        prevInput.name === name
          ? {
              ...prevInput,
              ...newValue,
            }
          : { ...prevInput },
      ),
    );
  };

  const resetInputValues = () => {
    setInputs((prevInputs) =>
      prevInputs.map((prevInput) => ({ ...prevInput, value: '' })),
    );
  };

  return {
    inputs,
    onInputChange,
    getSubmitInputs,
    getInputByName,
    setNewInputValue,
    resetInputValues,
  };
};
