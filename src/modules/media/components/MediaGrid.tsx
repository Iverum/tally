import styled from '@emotion/styled';
import React, { FC } from 'react';

import { MediaAttributes } from "../../../db"
import Image from "../components/Image"

const Grid = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px 0;
  > img {
    height: auto;
    margin: 3px;
    padding: 1px;
    border: 1px solid #ececec;
  }
`;

type MediaGridProps = {
  media: MediaAttributes[]
}

const MediaGrid: FC<MediaGridProps> = ({ media }) => (
  <Grid>
    {media.map((m) => {
      return <Image alt={m.source || ""} key={m.id} path={m.path} />;
    })}
  </Grid>
);

export default MediaGrid;
