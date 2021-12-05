import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';

class DisplayResult extends React.Component
{
  render = () => {
    return (
      <Segment>
        <Grid textAlign='right'>
          <Grid.Row>
            <Grid.Column>{this.props.value}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default DisplayResult;
