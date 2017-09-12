import React from 'react';
import { Grid, Image, Label, Segment } from 'semantic-ui-react';

const tileLabel = () => (
  <Grid columns={3}>
    <Grid.Row>
      <Grid.Column>
        <Segment padded>
          <Label attached='top left'>View</Label>
          <Image src='/assets/images/wireframe/paragraph.png' />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default tileLabel
