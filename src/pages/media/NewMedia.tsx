import styled from '@emotion/styled';
import React, { FC } from 'react';
import Button from 'react-bootstrap/Button';
import FormElement from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';

import { CheckboxInput, TextInput } from '../../components/form/Input';
import Header from '../../components/layout/Header';
import MainContent from '../../components/layout/MainContent';
import ImageSelector from "./components/ImageSelector"

const Content = styled(Row)`
  padding: 30px;
`;

const StyledForm = styled(FormElement)`
  width: 100%;
`

const Submit = styled(Button)`
  margin-top: 10px;
`

const NewMediaForm: FC = () => {
  return (
    <Form
      onSubmit={(values) => console.log('Submit', { values })}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Field<string> label="Upload" name="image" component={ImageSelector} />
          <Field<string> label="Tags" name="tags" component={TextInput} placeholder="Tags" />
          <Field<string> label="Source" name="source" type="url" component={TextInput} />
          <Field<boolean> label="NSFW" name="nsfw" component={CheckboxInput} type="checkbox" />
          <Submit type="submit">Submit</Submit>
        </StyledForm >
      )}
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
