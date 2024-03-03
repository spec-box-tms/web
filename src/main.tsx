import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react/scope';
import { allSettled } from 'effector';
import { Provider as ScopeProvider } from 'effector-react/scope';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { SpecBoxWebApi, SpecBoxWebApiModelDefaultConfigurationModel } from '@/api';
import { AnalyticsApi, controls, createScope, homeRoute, projectRoute, statRoute, testRunsRoute } from '@/model';

import { Application } from './Application';

import 'bootstrap/dist/css/bootstrap-grid.css';
import './index.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { ThemeProvider } from '@gravity-ui/uikit';

// golbals
declare global {
  interface Window {
    __SPEC_BOX_CONFIG: SpecBoxWebApiModelDefaultConfigurationModel;
    __SPEC_BOX_ANALYTICS_API?: AnalyticsApi;
  }
}

// scope // XXX
const api = new SpecBoxWebApi(window.location.origin + '/api', { allowInsecureConnection: true });
const analytics = window.__SPEC_BOX_ANALYTICS_API;
const scope = createScope({ api, analytics });

// router
const routes = [
  { path: '/', route: homeRoute },
  { path: '/project/:project', route: projectRoute },
  { path: '/project/:project/testruns', route: testRunsRoute },
  { path: '/project/:project/stat', route: statRoute },
];

const router = createHistoryRouter({ routes, controls });
const history = createBrowserHistory();
history.listen(({ location: { pathname, search, hash } }) =>
  analytics?.hit(pathname + search + hash),
);

// start
allSettled(router.setHistory, { scope, params: history });

// render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScopeProvider value={scope}>
      <ThemeProvider theme="light">
        <RouterProvider router={router}>
          <Application />
        </RouterProvider>
      </ThemeProvider>
    </ScopeProvider>
  </React.StrictMode>,
);
