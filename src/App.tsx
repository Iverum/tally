import styled from '@emotion/styled';
import * as React from 'react';
import Row from 'react-bootstrap/Row';
import { hot } from 'react-hot-loader';
import { Provider } from "react-redux";
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import Page from './components/layout/Page';
import AllMedia from './modules/media';
import NewMedia from './modules/media/NewMedia';
import store from "./store";

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const App = (): JSX.Element => (
  <Provider store={store}>
    <Page>
      <FullHeightRow>
        <Router>
          <Switch>
            <Route path="/new">
              <NewMedia />
            </Route>
            <Route path="/">
              <AllMedia />
            </Route>
          </Switch>
        </Router>
      </FullHeightRow>
    </Page>
  </Provider>
);

export default hot(module)(App);
