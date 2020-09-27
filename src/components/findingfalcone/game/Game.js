import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import stringFile from '../../../assets/stringsEnglish.json';
import './Game.css';
import GameDataHandler from './GameDataHandler.js';
import SelectionPanel from './SelectionPanel';
class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planets: [],
            vehicles:[],
            remainingPlanets: [],
            selectedPlanets:[],
            selectedVehicles:[],
            remainingVehicles:[],
            count:4,
            timetaken:0,
            findClicked: false
        }
        this.getPlanetsVehicles = this.getPlanetsVehicles.bind(this);
        this.loadSelectionPanels = this.loadSelectionPanels.bind(this);
        this.onPlanetChanged = this.onPlanetChanged.bind(this);
        this.onVehicleChanged = this.onVehicleChanged.bind(this);
        this.calculateTimeTaken = this.calculateTimeTaken.bind(this);
    }
    componentDidMount()
    {
        this.getPlanetsVehicles();
    }

        calculateTimeTaken()
        {
            var time=0;
            this.state.selectedPlanets.forEach((item, i)=>{
                if(item && this.state.selectedVehicles[i])
                {
                    var speed= this.state.selectedVehicles[i].speed;
                    time=time+(parseInt(item.distance)/parseInt(speed));
                }
            })
            this.setState({timetaken: time});
        }
    getPlanetsVehicles()
    {
        GameDataHandler.getPlanetsApi()
        .then(response=>{
            this.setState({planets: response, remainingPlanets: response});
        })
        .catch(error=>
            console.log(error));
    
        GameDataHandler.getVehiclesApi()
        .then(response=>{
            this.setState({vehicles: response , remainingVehicles: response})
        })
        .catch(error=>
            console.log(error));
    }
    onPlanetChanged(value, index)
    {
        var tempSelectedPlanets=[...this.state.selectedPlanets];
        tempSelectedPlanets[index]= this.state.planets.find(item=> item.name===value);
        var remainingPlanets= this.state.remainingPlanets.filter(item=> item.name!==value);
        this.setState({
            remainingPlanets: remainingPlanets,
            selectedPlanets: tempSelectedPlanets,
            resetClicked:false
        })
    }
    onVehicleChanged(value, index)
    {
        var tempSelectedVehicles=[...this.state.selectedVehicles]
        tempSelectedVehicles[index]= this.state.vehicles.find(item=> item.name===value);
        var remainingVehicles= this.state.remainingVehicles.map(item=> {
            if(item.name===value && item.total_no>=1)
            {
                item.total_no=item.total_no-1;
            }
            return item;
        });
        this.setState({
            selectedVehicles: tempSelectedVehicles,
            remainingVehicles: remainingVehicles
        },()=>this.calculateTimeTaken())
    }
    loadSelectionPanels()
    {
        var i;
        var listOfPanels= [];
        for(i=0;i<4;i++)
        {
            listOfPanels.push (
                <Col md={3} sm={6} xs={12} >
                         <SelectionPanel 
                         index={i} 
                         planets={this.state.remainingPlanets}
                         vehicles= {this.state.remainingVehicles}
                         onPlanetChanged={this.onPlanetChanged}
                         onVehicleChanged={this.onVehicleChanged}
                         />
                </Col>
            )
        }
        return listOfPanels;
    }
    resetGame()
    {
        window.location.reload(false);
    }
    findFalcone()
    {
        this.setState({findClicked: true})
        var planet_names= [];
        this.state.selectedPlanets.forEach(item=>{
            planet_names.push(item.name);
        })
        var vehicle_names= [];
        this.state.selectedVehicles.forEach(item=>{
            vehicle_names.push(item.name);
        })
        GameDataHandler.getToken()
        .then(response=>{
            console.log(response.token)
            var data={
                "token": response.token,
                "planet_names":planet_names,
                "vehicle_names":vehicle_names
            }
            GameDataHandler.findFalcone(data)
            .then(response=>{
                if(response.status)
                {
                    this.setState({msg:stringFile.falcone_found+ response.planet_name});
                }
                else{
                    this.setState({msg: stringFile.falcone_notfound})
                }
            });
        })
    }
    render() {
        return (
            <div>
                {(this.state.planets.length<=0 || this.state.vehicles.length<=0)||(this.state.findClicked&& !this.state.msg)?
                <h3 style={{color:"white", margin: "auto", align: "center"}}>{stringFile.loading}</h3>:
                this.state.findClicked?
                <Row>
                <h3 style={{color:"white", margin: "auto"}}>
                    {this.state.msg}
                </h3>
                </Row>
                :<div>
             <Row>
                {this.loadSelectionPanels()}
             </Row>
             <br/>
             <Row>
                 <h3 style={{color:"white", margin: "auto"}}>{stringFile.time_taken}:{this.state.timetaken}</h3>
             </Row>
             <br/>
            <Button className="button-style" onClick={this.findFalcone.bind(this)}>{stringFile.find}</Button>
             </div>}
            <Button className="button-style" onClick={this.resetGame.bind(this)}>{stringFile.restart}</Button>
             </div>
        );
    }

}

export default Game;