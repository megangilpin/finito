import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';

class Map extends React.PureComponent {
  state = {
    progress: [],
    loading: true
  }

  initialLocation = () => {
    const getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    getPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords

        this.setState({
          progress: [{ lat: latitude, lng: longitude }],
          loading: false
        })
        this.watchPosition()
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  watchPosition = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({ lat: position.coords.latitude, lng: position.coords.longitude })
        this.setState({ progress: location })
      }
    )
  }

  componentDidMount = () => {
    this.initialLocation()
  }

  render() {
    const { loading, progress } = this.state;

    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }
    
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: progress[0].lat, lng: progress[0].lng }}
      >
        {this.state.progress && (
          <>
            {/* Set path */}
            <Polyline path={progress} options={{ strokeColor: "#FF0000 " }} />
            {/* Set marker to last known location */}
            <Marker position={progress[progress.length - 1]} />
          </>
        )}
      </GoogleMap>
    )
  }
}

export default Map;