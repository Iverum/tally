import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import styled from '@emotion/styled';

const FullHeightContainer = styled(Container)`
  height: 100vh;
`;

const Page: FC<unknown> = ({ children }) => (
  <FullHeightContainer fluid>{children}</FullHeightContainer>
);

export default Page;
