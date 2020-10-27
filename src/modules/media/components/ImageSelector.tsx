import styled from "@emotion/styled"
import { OpenDialogOptions, remote } from "electron";
import fs from "fs";
import path from "path"
import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import { FieldRenderProps } from 'react-final-form';

import { Error } from "../../../components/form/Input"
import Image from "../components/Image"

const { app, dialog } = remote;
const picturesPath = app.getPath("pictures");
let lastPath: undefined | string;

function dialogOptions(): OpenDialogOptions {
  return {
    defaultPath: lastPath || picturesPath,
    filters: [{ extensions: ['jpg', 'png', 'gif'], name: "Images" }],
    properties: ["openFile"],
    title: "Add File"
  }
}

const Container = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HiddenInput = styled.input`
  display: none;
`

type ImageSelectorProps = FieldRenderProps<string, HTMLInputElement> & {
  label: string;
}

const ImageSelector: FC<ImageSelectorProps> = ({ input, label, meta: { error, touched } }) => {
  // TODO: this logic should probably be moved out of the render and into the Electron main
  const selectFile = async () => {
    const result = await dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions())
    if (!(result && result.filePaths[0])) {
      return;
    }

    lastPath = path.dirname(result.filePaths[0])
    input.onChange(result.filePaths[0])
  }
  return (
    <Container>
      <Image alt="New image to upload" path={input.value} />
      <HiddenInput onChange={input.onChange} value={input.value} />
      <Button onClick={selectFile} variant="secondary">{label}</Button>
      { touched && (error && <Error>{error}</Error>)}
    </Container>
  )
};

export default ImageSelector;