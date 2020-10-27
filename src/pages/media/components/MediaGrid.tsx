import styled from '@emotion/styled';
import React, { FC } from 'react';

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

const MediaGrid: FC = () => (
  <Grid>
    {Array(10).fill(0).map((_, index) => {
      if (index % 2 === 0) {
        return <img alt="A kitten" src="https://placekitten.com/400/200" />;
      }
      return <img alt="A kitten" src="https://placekitten.com/200/300" />;
    })}
  </Grid>
);

export default MediaGrid;
