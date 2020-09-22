import React from "react";
import { Route } from "react-router";
import Loadable from 'react-loadable';
import Loading from '../ui-molecules/Loading';

const UserHome = Loadable({
  loader: () => import('../ui-pages/UserHome'),
  loading: Loading,
});
const Landing = Loadable({
  loader: () => import('../ui-pages/UserHome/components/Landing'),
  loading: Loading,
});

const MainRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={UserHome} />

    </div>
  )
}

export default MainRoutes;
