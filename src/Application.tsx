import { Route } from 'atomic-router-react/scope';
import { FC } from 'react';

import { ApplicationLayout } from './components/ApplicationLayout/ApplicationLayout';
import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { homeRoute, projectRoute, statRoute, testRunsRoute } from './model';
import { Home } from './pages/Home/Home';
import { Project } from './pages/Project/Project';
import { Stat } from './pages/Stat/Stat';
import { TestRuns } from './pages/TestRuns/TestRuns';
import { testRunExecutionRoute } from './model/pages/testRunExecution';
import { TestRunExecution } from './pages/TestRunExecution/TestRunExecution';

export const Application: FC = () => {
  return (
    <ApplicationLayout>
        <Route route={homeRoute} view={Home} />
        <Route route={projectRoute} view={Project} />
        <Route route={testRunsRoute} view={TestRuns} />
        <Route route={testRunExecutionRoute} view={TestRunExecution} />
        <Route route={statRoute} view={Stat} />
      <ToastContainer />
    </ApplicationLayout>
  );
};
