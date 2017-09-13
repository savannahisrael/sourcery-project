import React from 'react';
import { Sticky, Segment } from 'semantic-ui-react';

const footer = () => (
  <Sticky bottomOffset='0' pushing>
    <Segment textAlign='center' padded='very' size='medium'>
      Made in San Diego © devCircle 2017
    </Segment>
  </Sticky>
)

export default footer
