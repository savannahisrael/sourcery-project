import React, { Component } from "react";
import { Tab } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import TileGrid from '../../Common/tileGrid';

const panes = [
  { menuItem: 'Active Projects', render: () =>
    <Tab.Pane attached={false}>
      <TileGrid/>
    </Tab.Pane>
  },
  { menuItem: 'Past Projects', render: () =>
    <Tab.Pane attached={false}>
      <TileGrid/>
    </Tab.Pane>
  },
  { menuItem: 'Create Project', render: () =>
    <Tab.Pane attached={false}>
      <CreateProjectForm/>
    </Tab.Pane>
  },
]

class Dashboard extends Component {
  render() {
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    );
  }
}

export default Dashboard
