import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { FieldRenderProps } from 'react-final-form';

type LabeledInput = {
  label: string;
}

type TextInputProps = FieldRenderProps<string, HTMLInputElement> & LabeledInput & {
  placeholder?: string;
}

export const TextInput: FC<TextInputProps> = ({
  input, label, ...rest
}) => (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" {...input} {...rest} />
    </Form.Group>
  );

type CheckboxInputProps = FieldRenderProps<boolean, HTMLInputElement> & LabeledInput

export const CheckboxInput: FC<CheckboxInputProps> = ({
  input: { value, ...input },
  label
}) => (<Form.Check id={input.name} type="checkbox">
  <Form.Check.Input {...input} checked={!!value} type="checkbox" />
  <Form.Check.Label>{label}</Form.Check.Label>
</Form.Check>)

type FileInputProps = FieldRenderProps<FileList, HTMLInputElement>

export const FileInput: FC<FileInputProps> = ({ input: { onChange, value, ...input }, ...rest }) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.files)
  }
  return (
    <input {...input} onChange={handleChange} type="file" {...rest} />
  )
}

export default {
  CheckboxInput,
  FileInput,
  TextInput
};
