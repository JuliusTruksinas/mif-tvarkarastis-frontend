import { ChangeEvent, useState } from 'react';
import { FormInput } from '../domain/form';

export const useForm = (inputBlueprints: FormInput[]) => {
  const [inputs, setInputs] = useState<FormInput[]>(inputBlueprints);

  const getSubmitInputs = (submitInputs: Array<FormInput>) =>
    Object.assign(
      {},
      ...submitInputs.map((input) => ({
        [input.name]: input.value,
      })),
    );

  const getInputByName = (name: string) =>
    inputs.find((input) => input.name === name);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setInputs((prevInputs) =>
      prevInputs.map((prevInput) =>
        prevInput.name == e.target.name
          ? {
              ...prevInput,
              value: e.target.value,
            }
          : { ...prevInput },
      ),
    );
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
