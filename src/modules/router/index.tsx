import React, { FC, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router-dom";

import Page from "../../components/layout/Page";
import { initialize, selectDatabaseReady } from "../../db/slice"
import AllMedia from "../media/AllMedia"
import NewMedia from "../media/NewMedia"

const LoadingIndicator: FC = () => (
  <Page>
    <Row style={{ height: "100%", alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      Loading…
    </Row>
  </Page>
)

const Router: FC = () => {
  const isReady = useSelector(selectDatabaseReady);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(initialize()) }, [])

  if (!isReady) {
    return <LoadingIndicator />
  }

  return (
    <MemoryRouter>
      <Switch>
        <Route path="/new">
          <NewMedia />
        </Route>
        <Route path="/">
          <AllMedia />
        </Route>
      </Switch>
    </MemoryRouter>
  )
}

export default Router;