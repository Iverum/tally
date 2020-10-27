import * as React from 'react';
import { hot } from 'react-hot-loader';
import Row from 'react-bootstrap/Row';
import styled from '@emotion/styled';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import Page from './components/layout/Page';
import AllMedia from './pages/media';
import NewMedia from './pages/media/NewMedia';

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const App = (): JSX.Element => (
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
);

export default hot(module)(App);
