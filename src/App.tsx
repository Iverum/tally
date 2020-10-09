import * as React from 'react';
import { hot } from 'react-hot-loader';
import Row from 'react-bootstrap/Row';
import styled from '@emotion/styled';

import MainContent from './components/layout/MainContent';
import SideNav from './components/layout/SideNav';
import Page from './components/layout/Page';
import MediaGrid from './components/MediaGrid';

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const App = (): JSX.Element => (
  <Page>
    <FullHeightRow>
      <SideNav />
      <MainContent><MediaGrid /></MainContent>
    </FullHeightRow>
  </Page>
);

export default hot(module)(App);
