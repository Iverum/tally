import styled from "@emotion/styled"
import fs from "fs";
import React, { FC, useEffect, useState } from "react";

const ImageContainer = styled.img`
  padding: 2px;
  border: 1px solid #ececec;
  margin-bottom: 5px;
  width: 100%;
`

type ImageProps = {
  alt: string;
  className?: string;
  path: string;
}

const Image: FC<ImageProps> = ({ alt, className, path }) => {
  const [src, setSrc] = useState(undefined);
  useEffect(() => {
    if (!path) { return; }

    try {
      const base64Img = fs.readFileSync(path).toString("base64");
      setSrc(`data:image/png;base64,${base64Img}`)
    } catch (err) {
      console.error(err);
    }
  }, [path])

  if (!src) {
    return null;
  }

  return (<ImageContainer alt={alt} className={className} src={src} />)
}

export default Image;