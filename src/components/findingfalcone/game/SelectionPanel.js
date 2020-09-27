import React, { Component } from 'react';
import { Row, Col, FormControl, FormCheck } from 'react-bootstrap';
import './Game.css';
class SelectionPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPlanetDrop: true,
            selectedPlanet:null,
            vehicleSelected:""
        }
        this.planetSelected= this.planetSelected.bind(this);
        this.vehicleSelected = this.vehicleSelected.bind(this);
    }
 

    render() {
        var planetList=[<option value="">Select...</option>];
        this.props.planets.forEach(item=>{
            planetList.push (<option value={item.name} >{item.name}</option>)
        })
        return (
             <Row style={{backgroundColor: "lightgrey", padding:"10px", margin: "5px"}} >
                 <FormControl as ="select" id="planet-drop" onChange={this.planetSelected} >
                    {this.state.showPlanetDrop ?
                    planetList
                    :<option defaultValue >{this.state.selectedPlanet.name}</option>}
                 </FormControl>
                 {this.state.selectedPlanet!==null && this.props.vehicles.map(item=>{
                        return (<Col md={12} sm={12} xs={12}><FormCheck type ="radio" name={this.props.index+ "vehicles"}
                         label={item.name+"("+item.total_no+")"} 
                         onChange={this.vehicleSelected} 
                         disabled={this.checkUsability(item)}
                        value={item.name}/></Col>)
                    })}
                 
             </Row>
        );
    }
    checkUsability(item)
    {
        if((item.total_no < 1) || (item.max_distance < this.state.selectedPlanet.distance)
            ||(this.state.vehicleSelected!=="" ))
            return true;
        else
            return false;
    }
    vehicleSelected(e)
    {
        this.setState({vehicleSelected: e.target.value})
        this.props.onVehicleChanged(e.target.value,this.props.index)
    }
    planetSelected(e)
    {
        this.setState({showPlanetDrop:false,  selectedPlanet: this.props.planets.find(item=> item.name===e.target.value)});
        this.props.onPlanetChanged(e.target.value, this.props.index);
      
    }

}

export default SelectionPanel;