import React from 'react';
import { Grid } from 'semantic-ui-react';
import Tile from '../projectTiles';

const TileGrid = () => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
      <Grid.Column>
        <Tile/>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default TileGrid
