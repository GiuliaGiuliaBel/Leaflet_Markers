import React, {Component} from 'react';

 export const MarkerTable = props => {
    const markers = props.markers.map(marker=> <MarkerRow key={marker._id} marker={marker} />)
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Location</th>  
            <th>Content</th>  
          </tr>
        </thead>
        <tbody>{markers}</tbody>
      </table>
    );
  }
  
  export const MarkerRow = (props) => (
    <tr>
      <td>{props.marker._id}</td>
      <td>{props.marker.location}</td>   
      <td>{props.marker.content}</td>   
    </tr>
  )

  export default class MarkerList extends Component {
    constructor() {
      super();
      this.state = { 
        markers: [] 
      };
    }  
  
    componentDidMount() {
      this.loadData();
    }
  
    loadData() {
       fetch('/api/user_places_reviews').then(response => {
           if (response.ok) {
              response.json().then(data => {
                 this.setState({markers: data.records });
               });
            } else {
               response.json().then(error => {
                 alert("Failed to fetch issues:" + error.message)
              });
             }
           }).catch(err => {
                   alert("Error in fetching data from server:", err);
                 });
    }

    render() {
      return (
        <div>
           <MarkerTable markers={this.state.markers} /> 
          <hr />
       </div>
      );
    }
  }

