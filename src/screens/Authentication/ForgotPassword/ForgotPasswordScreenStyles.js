import React from 'react';
import axios from 'axios';

import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import styles from './Styles/ForgotPasswordStyles';
import {Heading} from '../../../components/Heading';
import {Input} from '../../../components/Input';
import {FilledButton} from '../../../components/FilledButton';
import {Error} from '../../../components/Error';
import {AuthContainer} from '../../../components/AuthContainer';
import {Loading} from '../../../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../../../config';
import {Formik} from 'formik';
import * as yup from 'yup';
import {isIos} from '../../../constants/appStyles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Images} from '../../../themes/Images';

export function ForgotPasswordScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
  });

  function sendVerificationCode(email) {
    setLoading(true);
    axios
      .post(`${BASE_URL}/sendVerificationCode`, {
        email: email,
      })
      .then(function (response) {
        setLoading(false);
        console.log(response);
        navigation.navigate('ChangePassword');
      })
      .catch(function (error) {
        setLoading(false);
        setError(error.response.data.msg);
        setLoading(false);
        console.log(error.response.data);
      });
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 40,
    gestureIsClickThreshold: 5,
  };
  function onSwipeLeft(direction) {
    navigation.navigate('Advertise');
  }

  return (
    <AuthContainer>
      <SafeAreaView keyboardShouldPersistTaps="handled" style={styles.mainView}>
        <View style={styles.container}>
          <KeyboardAvoidingView enabled>
            <Image
              source={Images.ForgotPaasswordHeader}
              style={styles.headerImage}
            />
            <Heading style={styles.heading}>Forgot Password</Heading>
            <Text style={styles.titleCaptionStyle}>
              Enter e-mail to resest password
            </Text>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: ''}}
              onSubmit={values => {
                sendVerificationCode(values.email);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <Text style={styles.lableInput}>Email Address</Text>
                  <View style={styles.SectionStyle}>
                    <Input
                      name="email"
                      placeholder="Enter Email Address"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </View>
                  {errors.email && (
                    <Text style={styles.errorTextStyle}>{errors.email}</Text>
                  )}
                  <Error error={error} />
                  <FilledButton
                    title={'Send Verification Code'}
                    onPress={handleSubmit}
                    style={styles.loginButton}
                  />
                </>
              )}
            </Formik>
            <TouchableOpacity style={styles.loginButtonStyle}>
              <Text
                style={styles.haveAccount}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <Loading loading={loading} />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </AuthContainer>
  );
}
