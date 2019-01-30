import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import FetchLocation from './components/FetchLocation'; //./ is current directory 
//adding fetch location component (button that fetches location) in render function
import UsersMap from './components/UsersMap';


//what you export 
export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }
  getUserLocationHandler = () => 
    {
      //global object tied to react native, no need to import
      navigator.geolocation.getCurrentPosition(position => 
        {
          this.setState({
            userLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0421,
            }
          });
          fetch('https://sharing-places.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
            }) //fetch gives back a promise, so you can record response from network connections
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }, 
        err => console.log(err)); //two parameters, one is call back function, and the other is an error function
    }
  
  getUserPlacesHandler = () => 
    {
      fetch('https://sharing-places.firebaseio.com/places.json') //fetch gives back a promise, so you can record response from network connections
            .then(res => res.json())
            .then(parsedRes => {
              const placesArray = [];
              for (const key in parsedRes)
                {
                  placesArray.push({
                    latitude: parsedRes[key].latitude,
                    longitude: parsedRes[key].longitude,
                    id: key
                  });
                }
                this.setState({
                  usersPlaces: placesArray
                });
            })
            .catch(err => console.log(err))
    }

  //button where onPress triggers props.onGetLocation where onGetLocation = this.getUserLocationHandler 
  //so getUserLocationHandler is executed (props.this.getUserLocationHandler is passed to FetchLocation component)

  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} usersPlaces = {this.state.usersPlaces} />  
        <View style={{marginTop: 20}}>
            <Button color="#d2691e" title="Fetch Friend's Location!" onPress = {this.getUserPlacesHandler}>  </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
