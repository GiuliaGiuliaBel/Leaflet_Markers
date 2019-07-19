import React, {Component} from 'react';
import {loadData} from './API.jsx';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ModalComponent from './ModalComponent.jsx';

class MapComponent extends Component {
  constructor() {
   super();
    this.state = {
       markers: [],
       readyToAddMarker: true,
    };  
    this.handleMarker = this.handleMarker.bind(this);
    this.toggle = this.toggle.bind(this);
    this.createMarker = this.createMarker.bind(this);
  };
   
  componentDidMount(){
     loadData()
      .then(markers => {
        this.setState({markers});
      })
  }
 
  handleMarker(e) {
    if(this.state.readyToAddMarker) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const coord = {location:[lat,lng]};
      const newState = this.state.markers.concat(coord);
        this.setState({
              location:[lat,lng],
              markers: newState,
              readyToAddMarker: false,
              showModal: true  
        });
     };
  }

  toggle() {
    this.setState(prevProps => ({
      showModal: !prevProps.showModal,
      readyToAddMarker: true
      })
    );
  }

createMarker(newMarker){
    fetch('/api/user_places_reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMarker),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedMarker => {
          const newMarkers = this.state.markers.concat(updatedMarker);
          this.setState({markers: newMarkers,
          showModal: false,
          readyToAddMarker: true});
        });
      } else {
        response.json().then(error => {
          alert("Failed to add marker: " + error.message);
        });
      }
    }).catch(err => {
      alert("Error in sending data to server: " + err.message);
    });
  };

    render() {
      const center = {lat: 51.509, lng: -0.09};
      return (
          <div>
            <Map 
              center={center}
              onClick={(e)=>this.handleMarker(e)}
              zoom={13} 
              >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              /> 
              {this.state.markers.map(marker =>
               <Marker key={marker._id} 
                       position={marker.location}
               >
                  <Popup>
                    <span> <br/> {marker.content}</span> 
                  </Popup>  
               </Marker> 
              )}    
            </Map> 
            <ModalComponent showModal={this.state.showModal} 
                            location={this.state.location} 
                            createMarker={this.createMarker} 
                            toggle={this.toggle}/>
          </div>
        )
      }
   }
     
export default MapComponent