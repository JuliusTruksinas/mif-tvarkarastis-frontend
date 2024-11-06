import { ChangeEvent, useState } from 'react';
import { FormInput } from '../domain/form';

export const useForm = (inputBlueprints: FormInput[]) => {
  const [inputs, setInputs] = useState<FormInput[]>(inputBlueprints);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  return {
    inputs,
    onInputChange,
  };
};
