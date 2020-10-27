import styled from "@emotion/styled"
import { OpenDialogOptions, remote } from "electron";
import fs from "fs";
import path from "path"
import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import { FieldRenderProps } from 'react-final-form';

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
`

const HiddenInput = styled.input`
  display: none;
`

type ImageSelectorProps = FieldRenderProps<string, HTMLInputElement> & {
  label: string;
}

const ImageSelector: FC<ImageSelectorProps> = ({ input, label, meta }) => {
  const [preview, setPreview] = useState(undefined);
  // TODO: this logic should probably be moved out of the render and into the Electron main
  const selectFile = async () => {
    const result = await dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions())
    if (!(result && result.filePaths[0])) {
      return; // TODO maybe error
    }

    var img = fs.readFileSync(result.filePaths[0]).toString('base64');
    lastPath = path.dirname(result.filePaths[0])
    input.onChange(result.filePaths[0])
    setPreview(`data:image/png;base64,${img}`)
  }
  return (
    <Container>
      <img alt="Placeholder" src={preview} />
      <HiddenInput onChange={input.onChange} value={input.value} />
      <Button onClick={selectFile} variant="secondary">{label}</Button>
    </Container>
  )
};

export default ImageSelector;