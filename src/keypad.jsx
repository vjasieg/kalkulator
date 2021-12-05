import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react'
import { DATA_TYPE } from './constants'
const infixToPostfix = require('./infix-to-postfix');

class Keypad extends React.Component
{
  constructor(params) {
    super(params);
    this.state = {
      current: "",
    }
    console.log(this.calculate(infixToPostfix("2+3").split(" ")))
  }

  addToState = (v) => {
    this.state.currrent += (v + " ");
  }

  calculate = function(tokens) {
    let set = new Set();
    set.add('+');
    set.add('-');
    set.add('/');
    set.add('%');
    set.add('*');

    let i = 0;

    while(tokens.length > 1) {
      if(set.has(tokens[i+2])) {
        let res;
        switch(tokens[i+2]) {
          case '+':
            res = parseFloat(tokens[i]) + parseFloat(tokens[i+1]);
            break;
          case '-':
            res = parseFloat(tokens[i]) - parseFloat(tokens[i+1]);
            break;
          case '*':
            res = parseFloat(tokens[i]) * parseFloat(tokens[i+1])
            break;
          case '/':
            res = parseFloat(tokens[i]) / parseFloat(tokens[i+1]);
            break;
          case '%':
            res = parseFloat(tokens[i]) % parseFloat(tokens[i+1]);
            break;
        }
        tokens.splice(i, 3, res);
        i = 0;
      } else
        i++;
    }
    return tokens[0];
  };


  submitData = () => {
    let eq = this.calculate(infixToPostfix(this.state.current).split(" "))
    this.props.changeValueCallback(eq);
  }

  get_data_type = (val) => {
    if((val >= '0' && val <= '9')) {
      return DATA_TYPE.VALUE;
    }else if(val === '(') {
      return DATA_TYPE.BRACKET_OPEN
    }else if(val === ')') {
      return DATA_TYPE.BRACKET_CLOSE
    }else {
      return DATA_TYPE.OPERATION
    }
  }

  provide_data = (value) => {
    this.state.current += value + " ";

    const data = {
      type: this.get_data_type(value),
      value: value,
    };
    console.log(data)
    this.props.handleDataCallback(data);
  }

  render = () => {
    return (
      <Segment>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column><Button onClick={() => { this.provide_data('('); }}>(</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data(')'); }}>)</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('%'); }}>&#x25;</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('/'); }}>&#xF7;</Button></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column><Button onClick={() => { this.provide_data('7'); }}>7</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('8'); }}>8</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('9'); }}>9</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('*'); }}>&#xD7;</Button></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column><Button onClick={() => { this.provide_data('4'); }}>4</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('5'); }}>5</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('6'); }}>6</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('-'); }}>&#x2212;</Button></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column><Button onClick={() => { this.provide_data('1'); }}>1</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('2'); }}>2</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('3'); }}>3</Button></Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('+'); }}>&#x2B;</Button></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{/*<Button>&#x2213;</Button>*/}</Grid.Column>
            <Grid.Column><Button onClick={() => { this.provide_data('0'); }}>0</Button></Grid.Column>
            <Grid.Column>{/*<Button>.</Button>*/}</Grid.Column>
            <Grid.Column><Button onClick={this.submitData}>&#x3D;</Button></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }

}

export default Keypad;
