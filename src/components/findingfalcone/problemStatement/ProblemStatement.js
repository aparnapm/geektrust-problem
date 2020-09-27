import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Logo from '../../../media/KingShah.PNG';
import './ProblemStatement.css';
import stringFile from '../../../assets/stringsEnglish.json';
class ProblemStatement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {
        return (
            <Row>
            <Col md={3} sm={2} xs={1}></Col>
            <Col md={6} sm={8} xs={10} >
                <Card className="card-style">
                    <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{stringFile.instructions}</Card.Subtitle>
                        <Card.Text>
                            <div >
                                <img className="centerblock" alt="king shah" src={Logo}></img>
                                <br /><br />
                                {stringFile.problem_statement[this.state.index]}
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col md={6} sm={6} xs={6} onClick={this.prevClick.bind(this)} className="instr-button">
                                {this.state.index !== 0 ? "Back" : ""}</Col>
                            <Col md={6} sm={6} xs={6} onClick={this.nextClick.bind(this)} className="nextbutton instr-button">
                                {this.state.index < stringFile.problem_statement.length - 1 ? "Next" : ""}</Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </Col>
            </Row>
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