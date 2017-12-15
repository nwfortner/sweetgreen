import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';

import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton'

class Form extends React.Component {
  
  constructor() {

    super();

    // Initialize state with an initial state object

    this.initialState = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    };

    this.state = {...this.initialState};

  }

  validateInput() {

    // Validate all user input. Return true if the input is valid
    // and if some input is invalid return a string that explains what
    // field is invalid.

    let errorString = '';

    const {
      firstName,
      lastName,
      email,
      username,
      password
    } = this.state;

    if (!firstName.length) {
      errorString += 'You must include you\'re first name';
    } else if (!lastName.length) {
      errorString += 'You must include you\'re last name';
    } else if (!email.length || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
      errorString += 'You must include you\'re email and it must of of the format john@gmail.com';
    } else if (!username.length) {
      errorString += 'You must include a username';
    } else if (!password.length) {
      errorString += 'You must include a password';
    }

    return errorString.length ? errorString : true;

  }

  updateFormState = (name, value) => {

    this.setState({
      [name]: value
    });

  }

  handleTextChange = (name, value) => {

    this.updateFormState(name, value);

  }

  handleSubmit = () => {

    // Run input validation. If input is invalid then fire an Alert
    // that explains why the input is ivalid.

    const validateInput = this.validateInput();

    if (typeof validateInput === 'string') {

      Alert.alert(validateInput)

      return;

    }

    // If the input is valid then send it in a post request to the host.

    this.props.sendForm(this.state)
      .then(() => {

        // If the request is successful then fire an Alert that notifies the user of this success.
        // Also clear the form input.

        this.setState({...this.initialState})
        Alert.alert('Good job! You\'re awesome 👍💯');
      })
      .catch(() => {

        // IF there is an error with the request fire an alert to notify the user of this error.

        Alert.alert('Oh no! Something went wrong 👎😭')
      });

  }

  renderScrollViewStyle() {

    // Dynamically assign styles based on the device orientation.

    if (this.props.windowWidth < this.props.windowHeight) {
      return [styles.form, styles.portait];
    }

    return [styles.form, styles.landscape];

  }

  render() {

    return (
      <KeyboardAvoidingView
        behavior='padding'
        >
        <ScrollView
          overScrollMode='always'
          accessible={true} 
          style={this.renderScrollViewStyle()}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
          accessibilityLabel='Super awesome signup form'
          >
          <FormInput 
            placeholder='First name'  
            name='firstName' 
            value={this.state.firstName}
            handleTextChange={this.handleTextChange}
            accessibilityLabel='Enter first name'
            />
          <FormInput 
            placeholder='Last name'  
            name='lastName' 
            value={this.state.lastName}
            handleTextChange={this.handleTextChange}
            accessibilityLabel='Enter last name'
            />
          <FormInput 
            placeholder='Email'  
            name='email' 
            value={this.state.email}
            handleTextChange={this.handleTextChange}
            accessibilityLabel='Enter email'
            keyboardType='email-address'
            />
          <FormInput 
            placeholder='Username'  
            name='username'  
            value={this.state.username}
            handleTextChange={this.handleTextChange}
            accessibilityLabel='Enter username'
            />
          <FormInput 
            placeholder='Password'  
            name='password' 
            value={this.state.password}
            secureTextEntry={true}
            handleTextChange={this.handleTextChange}
            accessibilityLabel='Enter password'
            />
          <FormSubmitButton
            handleSubmit={this.handleSubmit}
            />  
        </ScrollView>
      </KeyboardAvoidingView>
    );

  }

}

const {
  height: windowHeight,
  width: windowWidth
} = Dimensions.get('window');

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-around',
  },
  form: {
    flex: 1,
    margin: 50,
    backgroundColor: '#1a1a1a',
    elevation: 10,
    borderRadius: 5
  },
  portait: {
    width: windowWidth - 50,
    height: windowHeight - 50,
  },
  landscape: {
    width: windowHeight - 50,
    height: windowWidth - 50,
  }
});

Form.propTypes = {
  sendForm: PropTypes.func,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number
};

export default Form;