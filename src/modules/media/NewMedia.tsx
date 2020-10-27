import styled from '@emotion/styled';
import Joi from "joi";
import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import FormElement from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Field, Form } from 'react-final-form';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

import { CheckboxInput, TextInput } from '../../components/form/Input';
import Header from '../../components/layout/Header';
import MainContent from '../../components/layout/MainContent';
import ImageSelector from "./components/ImageSelector"
import { addOneMedia } from "./slice";

type NewMedia = {
  image: string;
  nsfw: boolean;
  source: string;
  tags: string; // TODO maybe convert into an array
}

const INITIAL_VALUES: Partial<NewMedia> = {
  image: undefined,
  nsfw: false,
  source: undefined,
  tags: undefined,
}

const schema = Joi.object({
  image: Joi.string().min(1).required(),
  nsfw: Joi.boolean().required(),
  source: Joi.string(),
  tags: Joi.string()
}).with("image", "nsfw")

const Content = styled(Row)`
  padding: 30px;
`;

const StyledForm = styled(FormElement)`
  width: 100%;
`

const Submit = styled(Button)`
  margin-top: 10px;
`

const validate = (values: NewMedia) => {
  const messages: { [key: string]: string } = {}
  const { error } = schema.validate(values, { abortEarly: false });
  if (!error) {
    return messages;
  }

  error.details.forEach(detail => {
    messages[detail.context.key] = detail.message
  });
  return messages;
}

const NewMediaForm: FC = () => {
  const dispatch = useDispatch();

  return (
    <Form
      initialValues={INITIAL_VALUES}
      onSubmit={(values) => {
        dispatch(addOneMedia(values))
      }}
      render={({ handleSubmit, submitting }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Field<string> label="Upload" name="image" component={ImageSelector} />
          <Field<string> label="Tags" name="tags" component={TextInput} placeholder="Tags" />
          <Field<string> label="Source" name="source" type="url" component={TextInput} />
          <Field<boolean> label="NSFW" name="nsfw" component={CheckboxInput} type="checkbox" />
          <Submit type="submit" disabled={submitting}>Submit</Submit>
        </StyledForm >
      )}
      validate={validate}
    />
  );
};

const NewMedia: FC = () => {
  const history = useHistory();
  return (
    <MainContent>
      <Header onBack={history.goBack} title="New Media" />
      <Content>
        <NewMediaForm />
      </Content>
    </MainContent>
  );
};

export default NewMedia;
