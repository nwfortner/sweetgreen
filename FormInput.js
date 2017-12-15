import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class FormInput extends React.Component {

  constructor() {

    super();

    this.state = {
      isFocused: false
    };

  }

  onFocus() {

    this.setState({
      isFocused: true
    });

  }

  onBlur() {

    this.setState({
      isFocused: false
    })

  }

  renderFormInputStyle() {

    return this.state.isFocused ? [styles.formInput, styles.focused] : [styles.formInput : styles.unfocused];

  }

  render() {

    const {
      placeholder,
      name,
      value,
      handleTextChange,
      keyboardType = 'default',
      secureTextEntry = false,
      accessibilityLabel
    } = this.props;

    return (
      <TextInput
        onBlur={() => this.onBlur()}
        onFocus={() => this.onFocus()}
        placeholder={placeholder}
        placeholderTextColor='white'
        name={name}
        value={value}
        style={this.renderFormInputStyle()}
        onChangeText={text => handleTextChange(name, text)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid='transparent'
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        /> 
    );

  }

};

FormInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleTextChange: PropTypes.func,
  accessible: PropTypes.string
};

const styles = StyleSheet.create({
  formInput: {
    flex: 1,
    margin: 20,
    fontSize: 20,
    height: 50,
    color: 'white',
    borderBottomWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid'
  },
  unfocused: {
    borderColor: 'white'
  },
  focused: {
    borderColor: '#c26f8d'
  }
});

export default FormInput; 