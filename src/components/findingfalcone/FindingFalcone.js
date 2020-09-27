import React, { Component } from 'react';
import ProblemStatement from './problemStatement/ProblemStatement';
import {Button} from 'react-bootstrap';
import stringFile from '../../assets/stringsEnglish.json';
import Game from './game/Game';

class FindingFalcone extends Component {
  constructor(props) {
    super(props);
    this.state = {
        progress: 0
    };
    this.changeProgress = this.changeProgress.bind(this);

  }
  render() {
  return (
    <div>
    {this.state.progress===0?<div >
      <Button className="button-style" onClick={this.changeProgress}>{stringFile.begin_game}</Button>
      <ProblemStatement />
    </div>:
    <div >
      <Game/>
    </div>}
    </div>
  );
  }

changeProgress()
{
  this.setState({progress:1});
}
}
export default FindingFalcone;
