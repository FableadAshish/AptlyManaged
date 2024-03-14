import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {Heading} from '../../../components/Heading';
import {Input} from '../../../components/Input';
import {FilledButton} from '../../../components/FilledButton';
import {TextButton} from '../../../components/TextButton';
import {Error} from '../../../components/Error';
import {AuthContainer} from '../../../components/AuthContainer';
import {AuthContext} from '../../../contexts/AuthContext';
import {Loading} from '../../../components/Loading';
import Checkbox from '../../../components/checkBox';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {isIos} from '../../../constants/appStyles';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Images} from '../../../themes/Images';
import {styles} from './Styles/LoginScreenStyles';

export function LoginScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.mainView}>
          <View style={styles.container}>
            <KeyboardAvoidingView enabled>
              <Image source={Images.Hello} style={styles.headerImage} />
              <Heading style={styles.heading}>Login</Heading>
              <Text style={styles.titleCaptionStyle}>
                Proceed with your details
              </Text>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{email: '', password: ''}}
                onSubmit={async values => {
                  console.log(values);
                  setLoading(true);
                  try {
                    await login(values.email, values.password);
                  } catch (e) {
                    console.log(e.response.data);
                    console.log(e.response.data.error);
                    setError(e.response.data.error);
                    setLoading(false);
                  }
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
                    <Text style={styles.lableInput}>Username</Text>
                    <View style={styles.SectionStyle}>
                      <Input
                        name="email"
                        placeholder="Email Address"
                        style={styles.textInput}
                        inputStyle={{color: '#000'}}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                      />
                    </View>
                    {errors.email && (
                      <Text style={styles.errorTextStyle}>{errors.email}</Text>
                    )}
                    <Text style={styles.lableInput}>Password</Text>
                    <View style={styles.SectionStyle}>
                      <Input
                        name="password"
                        placeholder="Password"
                        style={styles.textInput}
                        inputStyle={{borderColor: '#000', color: '#000'}}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                      />
                    </View>
                    {errors.password && (
                      <Text style={styles.errorTextStyle}>
                        {errors.password}
                      </Text>
                    )}
                    <Text
                      style={styles.forgotTextStyle}
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      Forgot Password?
                    </Text>
                    {/* <Text>
                    <Checkbox name="terms" onPress={() => {
                        setChecked('1');
                        values.terms = '1';
                      }}/>  I Agree to Terms & Condition and Privacy Policy.</Text>
                      {errors.terms && (
                      <Text style={styles.errorTextStyle}>
                        {errors.terms}
                      </Text>
                    )} */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: 15,
                        flexWrap: 'wrap',
                      }}>
                      <Text>By using this app you agree to the </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('TermsConditionsScreen')
                        }>
                        <Text style={styles.underline}> Terms &</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PrivacyPolicyScreen')
                        }>
                        <Text style={styles.underline}> Privacy Policy</Text>
                      </TouchableOpacity>
                    </View>
                    <Error error={error} />
                    <FilledButton
                      title={'Login'}
                      onPress={handleSubmit}
                      style={styles.loginButton}
                    />
                  </>
                )}
              </Formik>
              <Loading loading={loading} />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthContainer>
  );
}
