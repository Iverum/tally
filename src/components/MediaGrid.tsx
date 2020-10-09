import React, { FC } from 'react';
import styled from '@emotion/styled';

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
    width: 30%
  }
`;

const MediaGrid: FC = () => (
  <Grid>
    {Array(10).fill(0).map((_, index) => {
      if (index % 2 === 0) {
        return <img src="https://placekitten.com/400/200" alt="A kitten" />;
      }
      return <img src="https://placekitten.com/200/300" alt="A kitten" />;
    })}
  </Grid>
);

export default MediaGrid;
