import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const FormSubmitButton = (props) => {

  const {
    handleSubmit,
  } = props

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel='Submit info button for super awesome sign up form'
      accessibilityTraits={['button']}
      onPress={handleSubmit}
      style={styles.formButton}
      >
      <Text
        style={styles.buttonText}
        >
        Submit info
      </Text>
    </TouchableOpacity>
  );

};

FormSubmitButton.propTypes = {
  handleSubmit: PropTypes.func
};

const styles = StyleSheet.create({
  formButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6fabc2',
    margin: 20,
    height: 50,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
  }
});

export default FormSubmitButton;