import React from "react";
import { Route } from "react-router";
import Loadable from 'react-loadable';
import Loading from '../ui-molecules/Loading';
const Payload = Loadable({
  loader: () => import('../ui-pages/UserHome/components/Content/components/Payload'),
  loading: Loading,
});
const History = Loadable({
  loader: () => import('../ui-pages/UserHome/components/Content/components/History'),
  loading: Loading,
});

const UserHomeRoutes = () => {
  return (
    <div>
      <Route exact path="/home" component={History} />
      <Route path="/home/payload" component={Payload} />
    </div>
  )
}

export default UserHomeRoutes;
