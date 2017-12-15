import React from 'react';
import {
  StyleSheet,
  Text, 
  View,
  Dimensions
} from 'react-native';
import axios from 'axios';

import Form from './Form';

export default class App extends React.Component {

  constructor() {

    super();

    // Assign the App compoenet state to an empty object and
    // initial an orientation event listener to the class property 'orientationListener'

    this.orientationListener = Dimensions.addEventListener;

    this.state = {};

  }

  componentWillMount() {

    // Set initial state width and height.

    const {
      width,
      height
    } = Dimensions.get('window');

    this.setState({
      window: {
        width,
        height
      }
    })

    // Initialize orintation listener.

    this.orientationListener('change', ({window}) => {

      const {
        width,
        height
      } = window;

      // Set the widow height and width to state properties on the 'change' event.

      this.setState({
        window: {
          width,
          height
        }
      });

    })

  }

  sendForm(formObject) {

    // Make an ajax call that sends the form object passed in.

    return axios.post('http://httpstat.us/200', formObject);

  }

  render() {
    return (
      <View 
        style={styles.container}
        behavior='padding'
        >
        <Form 
          sendForm={this.sendForm} 
          windowWidth={this.state.window.width}
          windowHeight={this.state.window.height}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8DC26F',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
