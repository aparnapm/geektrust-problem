import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Logo from '../media/KingShah.PNG';
import './problemStatement.css';
import stringFile from '../assets/stringsEnglish.json';
class ProblemStatement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {
        return (
            <div >
                <Card className="card-style">
                    <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Problem Context & Instructions</Card.Subtitle>
                        <Card.Text>
                            <div >
                                <img className="centerblock" src={Logo}></img>
                                <br /><br />
                                {stringFile.problem_statement[this.state.index]}
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col md={6} onClick={this.prevClick.bind(this)} className="instr-button">
                                {this.state.index !== 0 ? "Back" : ""}</Col>
                            <Col md={6} onClick={this.nextClick.bind(this)} className="nextbutton instr-button">
                                {this.state.index < stringFile.problem_statement.length - 1 ? "Next" : ""}</Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
    nextClick() {
        if(this.state.index!==stringFile.problem_statement.length-1)
        this.setState({ index: this.state.index + 1 })
    }
    prevClick() {
        if(this.state.index!==0)
        this.setState({ index: this.state.index - 1 })
    }
}

export default ProblemStatement;