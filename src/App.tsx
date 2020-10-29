import styled from '@emotion/styled';
import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import { hot } from 'react-hot-loader';
import { Provider } from "react-redux";

import Page from './components/layout/Page';
import Router from "./modules/router"
import store from "./store";

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const App: FC = () => (
  <Provider store={store}>
    <Page>
      <FullHeightRow>
        <Router />
      </FullHeightRow>
    </Page>
  </Provider>
);

export default hot(module)(App);
