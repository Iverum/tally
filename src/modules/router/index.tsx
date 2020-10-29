import React, { FC, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, Switch } from "react-router-dom";

import Page from "../../components/layout/Page";
import { initialize, selectDatabaseReady } from "../../db/slice"
import MediaRoutes from "../media";

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
        <MediaRoutes />
      </Switch>
    </MemoryRouter>
  )
}

export default Router;