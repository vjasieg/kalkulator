import React from 'react';
import { Grid } from 'semantic-ui-react'
import DisplayHexadecimal from './display_hex'
import DisplayDecimal from './display_dec'
import DisplayOctal from './display_oct'
import DisplayBinary from './display_bin'
import DisplayResult from './display_result'
import Keypad from './keypad'
import { addToState } from './keypad';
import Information from './information'
import { DATA_TYPE } from './constants'

class Application extends React.Component
{
  constructor(params) {
    super(params);

    this.state = {
      value: 2137,
      data: [
        // { type: DATA_TYPE.VALUE, value: '1234', },
        // { type: DATA_TYPE.OPERATION, value: '+', },
        // { type: DATA_TYPE.VALUE, value: '4321', },
      ],
    }
  }

  change_value = (v) => {
    this.setState({
      value: v,
    });
  }

  handle_data = (d) => {
    const newState = Object.assign({}, this.state);

    if (newState.data.length === 0) {
      if (d.type === DATA_TYPE.VALUE) {
        newState.data.push(d);
        this.setState(newState);
      }
      return;
    }

    const lastIndex = newState.data.length - 1;
    const lastItem = newState.data[lastIndex];
    const isOperation = (element) => { return DATA_TYPE.OPERATION === element.type };
    const isValue = (element) => { return DATA_TYPE.VALUE === element.type };
    const isBracketOpen = (element) => { return DATA_TYPE.BRACKET_OPEN === element.type };
    const isBracketClose = (element) => { return DATA_TYPE.BRACKET_CLOSE === element.type };

    if(isValue(lastItem) && isBracketOpen(d)) {
      return;
    }

    if(isOperation(lastItem) && isBracketClose(d)) {
      return;
    }

    if (isOperation(lastItem) && isOperation(d)) {
      return;
    }

    if (!isOperation(lastItem) && !isOperation(d)) {
      lastItem.value += d.value;
      this.setState(newState);
      return;
    }

    newState.data.push(d);
    this.setState(newState);
  }

  render = () => {
    return (
      <Grid columns={2} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
          <DisplayResult value={this.state.value} />
          <DisplayHexadecimal value={this.state.value} />
          <DisplayDecimal value={this.state.value} />
          <DisplayOctal value={this.state.value} />
          <DisplayBinary value={this.state.value} />
          <Keypad changeValueCallback={this.change_value} handleDataCallback={this.handle_data} />
        </Grid.Column>
        <Grid.Column style={{ maxWidth: 200 }}>
          <Information data={this.state.data} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Application;
