import React, { FC } from "react";
import { Route } from "react-router-dom";

import AllMedia from "./AllMedia";
import NewMedia from "./NewMedia";

const Media: FC = () => (
  <>
    <Route path="/new">
      <NewMedia />
    </Route>
    <Route path="/">
      <AllMedia />
    </Route>
  </>
)

export default Media;
